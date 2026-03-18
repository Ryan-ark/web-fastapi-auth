import { Search } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type ProductToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export function ProductToolbar({ search, onSearchChange }: ProductToolbarProps) {
  return (
    <Card className="bg-card/85 backdrop-blur">
      <CardHeader>
        <p className="section-label">Browse</p>
        <CardTitle className="mt-2 text-2xl">Inventory catalog</CardTitle>
      </CardHeader>

      <CardContent>
        <label className="grid gap-2">
          <span className="text-sm font-medium">Search by name</span>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-9"
              value={search}
              onChange={(event) => onSearchChange(event.target.value)}
              placeholder="Search products"
            />
          </div>
        </label>
      </CardContent>
    </Card>
  );
}
