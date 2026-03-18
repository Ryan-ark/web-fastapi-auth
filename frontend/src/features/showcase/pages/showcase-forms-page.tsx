import { useState } from "react";
import { Sparkles } from "lucide-react";

import { ShowcaseNav } from "@/features/showcase/components/showcase-nav";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";

export function ShowcaseFormsPage() {
  const [notes, setNotes] = useState("");
  const [emailOptIn, setEmailOptIn] = useState(true);
  const [expedite, setExpedite] = useState(false);

  return (
    <section className="showcase-page">
      <Card>
        <CardHeader className="gap-4">
          <div>
            <p className="section-label">Showcase</p>
            <CardTitle className="mt-2 text-3xl">Forms and input states</CardTitle>
          </div>
          <CardDescription>
            Shared primitives rendered in realistic form compositions instead of isolated screenshots.
          </CardDescription>
          <ShowcaseNav />
        </CardHeader>
      </Card>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile form</CardTitle>
              <CardDescription>Basic text inputs and validation-oriented copy.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-5">
              <div className="grid gap-2">
                <Label htmlFor="full-name">Full name</Label>
                <Input id="full-name" placeholder="Ari Tan" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email-address">Email address</Label>
                <Input id="email-address" type="email" placeholder="ari@example.com" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Project notes</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Describe what should be shipped in this sprint."
                />
                <p className="text-xs text-muted-foreground">{notes.length}/240 characters drafted</p>
              </div>
              <div className="flex gap-3">
                <Button>Save profile</Button>
                <Button variant="outline">Reset</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Preference controls</CardTitle>
              <CardDescription>State-driven checkbox and switch behavior.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-5">
              <div className="flex items-center justify-between rounded-xl border p-4">
                <div className="space-y-1">
                  <Label htmlFor="email-opt-in">Email release notes</Label>
                  <p className="text-sm text-muted-foreground">
                    Send launch summaries when the catalog changes.
                  </p>
                </div>
                <Switch id="email-opt-in" checked={emailOptIn} onCheckedChange={setEmailOptIn} />
              </div>
              <label className="flex items-start gap-3 rounded-xl border p-4">
                <Checkbox checked={expedite} onCheckedChange={(checked) => setExpedite(checked === true)} />
                <span className="grid gap-1 text-sm">
                  <span className="font-medium">Expedite review</span>
                  <span className="text-muted-foreground">
                    Promote the next change to the priority queue for faster QA.
                  </span>
                </span>
              </label>
              <Alert>
                <Sparkles className="h-4 w-4" />
                <AlertTitle>Live component state</AlertTitle>
                <AlertDescription>
                  Email opt-in is <strong>{emailOptIn ? "enabled" : "disabled"}</strong> and expedite
                  review is <strong>{expedite ? "requested" : "not requested"}</strong>.
                </AlertDescription>
              </Alert>
              <div className="flex flex-wrap gap-2">
                <Badge variant={emailOptIn ? "default" : "outline"}>Email {emailOptIn ? "on" : "off"}</Badge>
                <Badge variant={expedite ? "secondary" : "outline"}>Expedite {expedite ? "on" : "off"}</Badge>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </section>
  );
}
