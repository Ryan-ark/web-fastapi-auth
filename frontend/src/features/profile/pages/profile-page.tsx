import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/features/auth/components/auth-provider";

export function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="page-stack">
      <Card className="border-border/60 bg-card/90">
        <CardHeader className="panel-header">
          <div>
            <p className="section-label">Profile</p>
            <CardTitle className="mt-2 text-3xl">Account details</CardTitle>
          </div>
          <Badge variant="secondary" className="capitalize">
            {user?.role}
          </Badge>
        </CardHeader>
        <CardContent className="profile-grid">
          <div>
            <p className="section-label">Name</p>
            <p className="mt-2 text-lg font-medium">{user?.full_name}</p>
          </div>
          <div>
            <p className="section-label">Email</p>
            <p className="mt-2 text-lg font-medium">{user?.email}</p>
          </div>
          <div>
            <p className="section-label">Status</p>
            <p className="mt-2 text-lg font-medium">{user?.is_active ? "Active" : "Inactive"}</p>
          </div>
          <div>
            <p className="section-label">Role</p>
            <p className="mt-2 text-lg font-medium capitalize">{user?.role}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
