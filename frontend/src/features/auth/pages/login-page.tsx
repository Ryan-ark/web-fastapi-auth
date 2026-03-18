import { LoginForm } from "../components/login-form";

export function LoginPage() {
  return (
    <main className="auth-shell">
      <section className="auth-panel">
        <div className="space-y-4">
          <p className="section-label">Product control center</p>
          <h1 className="text-4xl font-semibold tracking-tight">Minimal auth. Clear roles. Secure by default.</h1>
          <p className="max-w-xl text-sm text-muted-foreground md:text-base">
            Sign in to access the protected dashboard, products workspace, and admin pages.
          </p>
        </div>
        <LoginForm />
      </section>
    </main>
  );
}
