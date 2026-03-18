import { Link } from "react-router-dom";
import { Layers3, LayoutTemplate, MousePointerClick, Palette } from "lucide-react";

import { ShowcaseNav } from "@/features/showcase/components/showcase-nav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const sections = [
  {
    title: "Forms",
    description: "Inputs, textareas, checkboxes, switches, validation copy, and tabbed samples.",
    href: "/showcase/forms",
    icon: LayoutTemplate,
  },
  {
    title: "Overlays",
    description: "Dialogs and alert dialogs wired with working interactions and notification actions.",
    href: "/showcase/overlays",
    icon: MousePointerClick,
  },
  {
    title: "Data display",
    description: "Cards, badges, skeletons, separators, and chart previews using live theme tokens.",
    href: "/showcase/data-display",
    icon: Layers3,
  },
];

export function ShowcaseHomePage() {
  return (
    <section className="showcase-page">
      <Card className="border-primary/20 bg-card/85 backdrop-blur">
        <CardHeader className="gap-4">
          <Badge className="w-fit gap-1" variant="secondary">
            <Palette className="h-3.5 w-3.5" />
            shadcn showcase
          </Badge>
          <div className="space-y-3">
            <CardTitle className="text-3xl">Component sandbox</CardTitle>
            <CardDescription className="max-w-3xl text-base">
              This route group is the implementation sandbox for the new design system. It validates
              runtime theme tokens, shared primitives, and category-focused interaction patterns
              without mixing demo-only content into the product flow.
            </CardDescription>
          </div>
          <ShowcaseNav />
        </CardHeader>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {sections.map((section) => {
          const Icon = section.icon;

          return (
            <Card key={section.href} className="bg-card/80">
              <CardHeader className="gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <CardTitle className="text-2xl">{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <Separator />
                <Button asChild>
                  <Link to={section.href}>Open {section.title.toLowerCase()}</Link>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
