import { Badge } from "@/components/ui/badge";

type SectionHeadingProps = {
  badge?: string;
  title: string;
  description?: string;
};

export function SectionHeading({ badge, title, description }: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {badge ? <Badge className="mx-auto w-fit">{badge}</Badge> : null}
      <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-3 text-pretty text-sm text-slate-600 sm:text-base dark:text-slate-300">{description}</p>
      ) : null}
    </div>
  );
}
