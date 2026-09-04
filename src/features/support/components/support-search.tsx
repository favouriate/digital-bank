"use client";

import { Search } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";

type SupportSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export function SupportSearch({ value, onChange }: SupportSearchProps) {
  return (
    <div className="w-full">
      <Label htmlFor="support-search" className="sr-only">
        Search help topics
      </Label>
      <InputGroup className="h-11 min-h-11">
        <InputGroupAddon>
          <Search className="size-4" aria-hidden="true" />
        </InputGroupAddon>
        <InputGroupInput
          id="support-search"
          type="search"
          value={value}
          placeholder="Search for help topics..."
          onChange={(event) => onChange(event.target.value)}
        />
      </InputGroup>
    </div>
  );
}
