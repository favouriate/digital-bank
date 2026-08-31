import { GlobalSearch } from "@/features/search/components/global-search";

type SearchEntryProps = {
  className?: string;
};

export function SearchEntry({ className }: SearchEntryProps) {
  return <GlobalSearch className={className} />;
}
