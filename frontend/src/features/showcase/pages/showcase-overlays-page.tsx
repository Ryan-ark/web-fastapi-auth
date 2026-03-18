import { BellRing, Rocket } from "lucide-react";
import { toast } from "sonner";

import { ShowcaseNav } from "@/features/showcase/components/showcase-nav";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function ShowcaseOverlaysPage() {
  return (
    <section className="showcase-page">
      <Card>
        <CardHeader className="gap-4">
          <div>
            <p className="section-label">Showcase</p>
            <CardTitle className="mt-2 text-3xl">Overlays and feedback</CardTitle>
          </div>
          <CardDescription>
            Dialogs, alert dialogs, and notification feedback wired against the shared providers.
          </CardDescription>
          <ShowcaseNav />
        </CardHeader>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Dialog</CardTitle>
            <CardDescription>Standard modal content with footer actions.</CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog>
              <DialogTrigger asChild>
                <Button>Open dialog</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Launch review checklist</DialogTitle>
                  <DialogDescription>
                    This dialog demonstrates the shared modal primitive and focus-trapped overlay.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-3 rounded-xl border border-dashed p-4 text-sm text-muted-foreground">
                  <p>1. Review the updated inventory states.</p>
                  <p>2. Confirm theme contrast in both modes.</p>
                  <p>3. Check that toast feedback appears after actions.</p>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Close</Button>
                  </DialogClose>
                  <Button onClick={() => toast.success("Checklist approved for handoff.")}>
                    Confirm
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Alert dialog</CardTitle>
            <CardDescription>Destructive confirmation with explicit cancel and confirm actions.</CardDescription>
          </CardHeader>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive">Open destructive flow</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Deploy the showcase changes?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This simulates a guarded launch action. The confirm button triggers a toast to
                    prove the overlay and provider stack are both active.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={() => toast.success("Deployment queued.")}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Notification actions</CardTitle>
            <CardDescription>Sonner is available globally and theme-aware.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => toast("Theme preview saved.")} className="gap-2">
              <BellRing className="h-4 w-4" />
              Neutral toast
            </Button>
            <Button onClick={() => toast.success("Accent preset published.")} className="gap-2">
              <Rocket className="h-4 w-4" />
              Success toast
            </Button>
            <Button variant="destructive" onClick={() => toast.error("A blocking issue needs review.")}>
              Error toast
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
