type RoutePlaceholderProps = {
  title: string;
};

export function RoutePlaceholder({ title }: RoutePlaceholderProps) {
  return (
    <section aria-labelledby="route-placeholder-heading">
      <h1
        id="route-placeholder-heading"
        className="text-2xl font-semibold tracking-tight text-foreground"
      >
        {title}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        This screen is a temporary placeholder for Application Shell navigation.
      </p>
    </section>
  );
}
