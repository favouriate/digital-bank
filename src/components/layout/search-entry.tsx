import { GlobalSearch } from "@/features/search/components/global-search";

type SearchEntryProps = {
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showTrigger?: boolean;
};

export function SearchEntry({
  className,
  open,
  onOpenChange,
  showTrigger,
}: SearchEntryProps) {
  return (
    <GlobalSearch
      className={className}
      open={open}
      onOpenChange={onOpenChange}
      showTrigger={showTrigger}
    />
  );
}
