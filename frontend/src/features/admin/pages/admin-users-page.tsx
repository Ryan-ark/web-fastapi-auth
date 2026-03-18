import { FormEvent, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/features/auth/components/auth-provider";
import { UserRole } from "@/features/auth/types/auth";

import { useCreateUser, useUpdateUserRole, useUpdateUserStatus, useUsers } from "../hooks/use-users";

const roles: UserRole[] = ["admin", "manager", "viewer"];

export function AdminUsersPage() {
  const { user: currentUser } = useAuth();
  const usersQuery = useUsers();
  const createUserMutation = useCreateUser();
  const updateRoleMutation = useUpdateUserRole();
  const updateStatusMutation = useUpdateUserStatus();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("viewer");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleCreateUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    try {
      await createUserMutation.mutateAsync({
        email,
        full_name: fullName,
        password,
        role,
        is_active: true,
      });
      setEmail("");
      setFullName("");
      setPassword("");
      setRole("viewer");
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Unable to create user.");
    }
  }

  return (
    <div className="page-stack">
      <Card className="border-border/60 bg-card/90">
        <CardHeader className="panel-header">
          <div>
            <p className="section-label">Admin users</p>
            <CardTitle className="mt-2 text-3xl">User directory</CardTitle>
          </div>
          <Badge variant="secondary">{usersQuery.data?.length ?? 0} total</Badge>
        </CardHeader>
        <CardContent className="admin-users-grid">
          <Card className="border-border/60 bg-background/70">
            <CardHeader>
              <CardTitle className="text-xl">Create user</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4" onSubmit={handleCreateUser}>
                <div className="grid gap-2">
                  <Label htmlFor="new-user-name">Full name</Label>
                  <Input
                    id="new-user-name"
                    value={fullName}
                    onChange={(event) => setFullName(event.target.value)}
                    placeholder="Casey Flores"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="new-user-email">Email</Label>
                  <Input
                    id="new-user-email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    placeholder="casey@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="new-user-password">Password</Label>
                  <Input
                    id="new-user-password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Create a secure password"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Role</Label>
                  <div className="role-toggle-group">
                    {roles.map((roleOption) => (
                      <Button
                        key={roleOption}
                        type="button"
                        variant={role === roleOption ? "default" : "outline"}
                        onClick={() => setRole(roleOption)}
                        className="capitalize"
                      >
                        {roleOption}
                      </Button>
                    ))}
                  </div>
                </div>
                {errorMessage ? <p className="text-sm text-destructive">{errorMessage}</p> : null}
                <Button type="submit" disabled={createUserMutation.isPending}>
                  {createUserMutation.isPending ? "Creating..." : "Create user"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="page-stack xl:col-span-2">
            {usersQuery.isLoading ? <Card><CardContent className="p-6">Loading users...</CardContent></Card> : null}
            {usersQuery.data?.map((user) => (
              <Card key={user.id} className="border-border/60 bg-background/70">
                <CardContent className="grid gap-4 p-5">
                  <div className="panel-header">
                    <div>
                      <h3 className="text-lg font-semibold">{user.full_name}</h3>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="secondary" className="capitalize">
                        {user.role}
                      </Badge>
                      <Badge variant={user.is_active ? "default" : "outline"}>
                        {user.is_active ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                  </div>

                  <div className="role-toggle-group">
                    {roles.map((roleOption) => (
                      <Button
                        key={roleOption}
                        type="button"
                        variant={user.role === roleOption ? "default" : "outline"}
                        className="capitalize"
                        disabled={updateRoleMutation.isPending || currentUser?.id === user.id}
                        onClick={() => updateRoleMutation.mutate({ userId: user.id, role: roleOption })}
                      >
                        {roleOption}
                      </Button>
                    ))}
                    <Button
                      type="button"
                      variant={user.is_active ? "outline" : "default"}
                      disabled={updateStatusMutation.isPending || currentUser?.id === user.id}
                      onClick={() =>
                        updateStatusMutation.mutate({ userId: user.id, isActive: !user.is_active })
                      }
                    >
                      {user.is_active ? "Disable" : "Activate"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
