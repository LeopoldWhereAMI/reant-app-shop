"use client";

import { FormField } from "../forms/FormField";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormData, loginSchema } from "./schemas/login-schema";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginFormData) => {
    const { error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
    });

    if (error) {
      setError("root", {
        message: "Неверный email или пароль",
      });

      return;
    }

    router.push("/");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-3 rounded-xl border bg-card p-6 shadow-sm"
      noValidate
    >
      <FormField id="email" label="Email" error={errors.email?.message}>
        <Input
          type="email"
          placeholder="you@example.com"
          {...register("email")}
          aria-invalid={!!errors.email}
          aria-describedby="email-error"
        />
      </FormField>

      <FormField id="password" label="Пароль" error={errors.password?.message}>
        <Input
          type="password"
          placeholder="••••••••"
          {...register("password")}
          aria-invalid={!!errors.password}
          aria-describedby="password-error"
        />
      </FormField>

      <p
        role="alert"
        className="h-4 truncate text-xs leading-4 text-destructive"
      >
        {errors.root?.message}
      </p>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Вход..." : "Войти"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Нет аккаунта?
        <Link
          href="/register"
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Зарегистрироваться
        </Link>
      </p>
    </form>
  );
}
