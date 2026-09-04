"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { SupportRequestError } from "../types/support";
import {
  isSupportCategoryId,
  type SupportCategoryId,
} from "../types/support";
import { useCreateSupportRequestMutation } from "../hooks/use-create-support-request";
import { useSupportTopicsQuery } from "../hooks/use-support-topics-query";
import { filterTopics } from "../lib/filter-topics";
import type { ContactSupportValues } from "../schemas/contact-schema";

import { ContactSupportDialog } from "./contact-support-dialog";
import { SupportCategoryGrid } from "./support-category-grid";
import { SupportContactCard } from "./support-contact-card";
import { SupportEmpty } from "./support-empty";
import { SupportError } from "./support-error";
import { SupportFaqList } from "./support-faq-list";
import { SupportHoursCard } from "./support-hours-card";
import { SupportSearch } from "./support-search";
import { SupportSkeleton } from "./support-skeleton";

export function SupportView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = useSupportTopicsQuery();
  const createRequest = useCreateSupportRequestMutation();

  const [search, setSearch] = useState("");
  const [contactOpen, setContactOpen] = useState(false);
  const [contactError, setContactError] = useState<string | null>(null);
  const [resultReference, setResultReference] = useState<string | null>(null);

  const categoryParam = searchParams.get("category");
  const selectedCategory =
    categoryParam && isSupportCategoryId(categoryParam)
      ? categoryParam
      : null;

  function updateCategory(next: SupportCategoryId | null) {
    const params = new URLSearchParams(searchParams.toString());

    if (next) {
      params.set("category", next);
    } else {
      params.delete("category");
    }

    const queryString = params.toString();
    router.replace(queryString ? `/support?${queryString}` : "/support", {
      scroll: false,
    });
  }

  function handleSelectCategory(id: SupportCategoryId) {
    updateCategory(selectedCategory === id ? null : id);
  }

  function handleClearSearch() {
    setSearch("");
    updateCategory(null);
  }

  async function handleSubmit(values: ContactSupportValues) {
    setContactError(null);

    try {
      const result = await createRequest.mutateAsync(values);
      setResultReference(result.reference);
    } catch (error) {
      setContactError(
        error instanceof SupportRequestError
          ? error.message
          : "Unable to submit your request. Please try again.",
      );
    }
  }

  if (query.isPending) {
    return <SupportSkeleton />;
  }

  if (query.isError || !query.data) {
    return <SupportError onRetry={() => void query.refetch()} />;
  }

  const topics = filterTopics(query.data, {
    query: search,
    category: selectedCategory,
  });
  const canClear = Boolean(search.trim() || selectedCategory);

  return (
    <div className="flex min-w-0 flex-col gap-6 overflow-x-hidden">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground lg:text-3xl">
          Support Center
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          How can we help you today?
        </p>
      </div>

      <SupportSearch value={search} onChange={setSearch} />

      <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
        <div className="order-1 min-w-0 lg:col-span-8 lg:col-start-1 lg:row-start-1">
          <SupportCategoryGrid
            selected={selectedCategory}
            onSelect={handleSelectCategory}
          />
        </div>
        <div className="order-2 flex min-w-0 flex-col gap-4 lg:order-none lg:col-span-4 lg:col-start-9 lg:row-span-2 lg:row-start-1">
          <SupportContactCard
            onContact={() => {
              setResultReference(null);
              setContactError(null);
              setContactOpen(true);
            }}
          />
          <SupportHoursCard />
        </div>
        <div className="order-3 min-w-0 lg:col-span-8 lg:col-start-1 lg:row-start-2">
          {topics.length > 0 ? (
            <SupportFaqList topics={topics} />
          ) : (
            <SupportEmpty
              canClear={canClear}
              onClear={handleClearSearch}
              onContact={() => {
                setResultReference(null);
                setContactError(null);
                setContactOpen(true);
              }}
            />
          )}
        </div>
      </div>

      <ContactSupportDialog
        open={contactOpen}
        isPending={createRequest.isPending}
        error={contactError}
        resultReference={resultReference}
        defaultCategory={selectedCategory ?? "account"}
        onOpenChange={(open) => {
          setContactOpen(open);
          if (!open) {
            setContactError(null);
            setResultReference(null);
          }
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
