import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <div>
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Создать аккаунт</h1>

        <p className="mt-2 text-muted-foreground">
          Зарегистрируйтесь, чтобы арендовать инструмент
        </p>
      </div>

      <RegisterForm />
    </div>
  );
}
