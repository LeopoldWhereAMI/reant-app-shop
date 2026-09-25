"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterFormData, registerSchema } from "./schemas/register-schema";
import { Checkbox } from "../ui/checkbox";
import { FormField } from "../forms/FormField";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function RegisterForm() {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterFormData) => {
    const { error } = await authClient.signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      phoneNumber: data.phoneNumber,
      callbackURL: "/login",
    });

    if (error) {
      setError("root", {
        message: error.message || "Не удалось зарегистрироваться",
      });

      return;
    }
    router.push("/register/success");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-3 rounded-xl border bg-card p-6 shadow-sm"
    >
      <FormField id="name" label="Имя" error={errors.name?.message}>
        <Input
          type="text"
          placeholder="Иван Иванов"
          {...register("name")}
          aria-invalid={!!errors.name}
          aria-describedby="name-error"
        />
      </FormField>

      <FormField
        id="phoneNumber"
        label="Телефон"
        error={errors.phoneNumber?.message}
      >
        <Input
          type="tel"
          placeholder="+7 999 123-45-67"
          {...register("phoneNumber")}
          aria-invalid={!!errors.phoneNumber}
          aria-describedby="name-error"
        />
      </FormField>

      <FormField id="email" label="Email" error={errors.email?.message}>
        <Input
          type="email"
          placeholder="you@example.com"
          {...register("email")}
          aria-invalid={!!errors.email}
          aria-describedby="name-error"
        />
      </FormField>

      <FormField id="password" label="Пароль" error={errors.password?.message}>
        <Input
          type="password"
          placeholder="••••••••"
          {...register("password")}
          aria-invalid={!!errors.password}
          aria-describedby="name-error"
        />
      </FormField>

      <Controller
        name="agreeToTerms"
        control={control}
        render={({ field, fieldState }) => (
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <Checkbox
                id="agreeToTerms"
                checked={!!field.value}
                onCheckedChange={field.onChange}
                aria-invalid={!!fieldState.error}
                aria-describedby="agreeToTerms-error"
                className="mt-0.5"
              />
              <Label
                htmlFor="agreeToTerms"
                className="cursor-pointer leading-snug"
              >
                Я согласен на обработку персональных данных
              </Label>
            </div>
            <p
              id="agreeToTerms-error"
              role="alert"
              className="h-4 truncate text-xs leading-4 text-destructive"
            >
              {fieldState.error?.message}
            </p>
          </div>
        )}
      />
      {errors.root?.message && (
        <p role="alert" className="text-sm text-destructive">
          {errors.root.message}
        </p>
      )}
      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Регистрация..." : "Зарегистрироваться"}
      </Button>
    </form>
  );
}
