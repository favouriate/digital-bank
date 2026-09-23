"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import type { SupportTopic } from "../types/support";

type SupportFaqListProps = {
  topics: SupportTopic[];
};

export function SupportFaqList({ topics }: SupportFaqListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Frequently asked questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion className="w-full">
          {topics.map((topic) => (
            <AccordionItem key={topic.id} value={topic.id}>
              <AccordionTrigger className="min-h-11 py-3 text-base">
                {topic.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                <p>{topic.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
