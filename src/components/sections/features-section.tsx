import { SectionHeading } from "@/components/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { productHighlights } from "@/lib/constants";

export function FeaturesSection() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Product"
          title="A premium local mobility product, not just another taxi listing"
          description="Engineered for conversion, trust and scale from day one."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {productHighlights.map((item, index) => (
            <FadeIn key={item.title} delay={0.08 * index}>
              <Card className="h-full">
                <div className="mb-4 inline-flex rounded-xl bg-brand/10 p-2 text-brand-dark">
                  <item.icon size={18} />
                </div>
                <CardTitle>{item.title}</CardTitle>
                <CardDescription className="mt-2">{item.description}</CardDescription>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
