import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Войти в аккаунт</h1>

        <p className="mt-2 text-muted-foreground">Войдите, чтобы продолжить</p>
      </div>

      <LoginForm />
    </div>
  );
}
