import LoginForm from "@/components/auth/LoginForm";
import { authClient } from "@/lib/auth/auth-client";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("@/lib/auth/auth-client", () => ({
  authClient: {
    signIn: {
      email: vi.fn(),
    },
  },
}));

describe("LoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useRouter).mockReturnValue({
      push,
    } as unknown as ReturnType<typeof useRouter>);
  });

  it("успешно выполняет вход и перенаправляет на главную страницу", async () => {
    vi.mocked(authClient.signIn.email).mockResolvedValue({
      data: {},
      error: null,
    });

    const user = userEvent.setup();

    render(<LoginForm />);

    await user.type(screen.getByLabelText("Email"), "ivan@example.com");
    await user.type(screen.getByLabelText("Пароль"), "Password123!");

    await user.click(screen.getByRole("button", { name: "Войти" }));

    expect(authClient.signIn.email).toHaveBeenCalledWith({
      email: "ivan@example.com",
      password: "Password123!",
    });

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith("/");
    });
  });

  it("показывает ошибку при неудачном входе и не перенаправляет пользователя", async () => {
    vi.mocked(authClient.signIn.email).mockResolvedValue({
      data: {},
      error: { message: "Неверный email или пароль" },
    });

    const user = userEvent.setup();

    render(<LoginForm />);

    await user.type(screen.getByLabelText("Email"), "ivan@example.com");
    await user.type(screen.getByLabelText("Пароль"), "invalid");

    await user.click(screen.getByRole("button", { name: "Войти" }));

    expect(screen.getByText("Неверный email или пароль")).toBeInTheDocument();
    expect(push).not.toHaveBeenCalled();
  });

  it("не отправляет форму с невалидным email", async () => {
    const user = userEvent.setup();

    render(<LoginForm />);

    await user.type(screen.getByLabelText("Email"), "invalid");
    await user.type(screen.getByLabelText("Пароль"), "Password123!");

    await user.click(screen.getByRole("button", { name: "Войти" }));

    expect(screen.getByText("Введите корректный email")).toBeInTheDocument();

    expect(authClient.signIn.email).not.toHaveBeenCalled();
    expect(push).not.toHaveBeenCalled();
  });
});
