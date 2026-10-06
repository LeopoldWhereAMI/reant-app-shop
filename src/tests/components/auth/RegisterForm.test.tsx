import RegisterForm from "@/components/auth/RegisterForm";
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
    signUp: {
      email: vi.fn(),
    },
  },
}));

const fillForm = async (user: ReturnType<typeof userEvent.setup>) => {
  await user.type(screen.getByLabelText("Имя"), "Иван Иванов");
  await user.type(screen.getByLabelText("Телефон"), "+79991234567");
  await user.type(screen.getByLabelText("Email"), "ivan@example.com");
  await user.type(screen.getByLabelText("Пароль"), "Password123!");

  await user.click(
    screen.getByRole("checkbox", {
      name: /я согласен на обработку персональных данных/i,
    }),
  );
};

describe("RegisterForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useRouter).mockReturnValue({
      push,
    } as unknown as ReturnType<typeof useRouter>);
  });

  it("успешно регистрирует пользователя и перенаправляет на страницу success", async () => {
    vi.mocked(authClient.signUp.email).mockResolvedValue({
      data: {},
      error: null,
    });

    const user = userEvent.setup();

    render(<RegisterForm />);

    await fillForm(user);

    await user.click(
      screen.getByRole("button", { name: "Зарегистрироваться" }),
    );

    expect(authClient.signUp.email).toHaveBeenCalledWith({
      name: "Иван Иванов",
      email: "ivan@example.com",
      password: "Password123!",
      phoneNumber: "+79991234567",
      callbackURL: "/login",
    });

    await waitFor(() => {
      expect(push).toHaveBeenCalledWith("/register/success");
    });
  });

  it("показывает ошибку при неудачной регистрации и не перенаправляет пользователя", async () => {
    vi.mocked(authClient.signUp.email).mockResolvedValue({
      data: {},
      error: { message: "Не удалось зарегистрироваться" },
    });

    const user = userEvent.setup();

    render(<RegisterForm />);

    await fillForm(user);

    await user.click(
      screen.getByRole("button", { name: "Зарегистрироваться" }),
    );

    expect(
      screen.getByText("Не удалось зарегистрироваться"),
    ).toBeInTheDocument();

    expect(push).not.toHaveBeenCalled();
  });

  it("не отправляет форму с невалидными данными и показывает ошибку", async () => {
    const user = userEvent.setup();

    render(<RegisterForm />);

    await fillForm(user);

    await user.clear(screen.getByLabelText("Email"));
    await user.type(screen.getByLabelText("Email"), "invalid");

    await user.click(
      screen.getByRole("button", { name: "Зарегистрироваться" }),
    );

    expect(screen.getByText("Некорректный email")).toBeInTheDocument();
    expect(authClient.signUp.email).not.toHaveBeenCalled();
    expect(push).not.toHaveBeenCalled();
  });

  it("не отправляет форму без согласия на обработку персональных данных", async () => {
    const user = userEvent.setup();

    render(<RegisterForm />);

    await user.type(screen.getByLabelText("Имя"), "Иван Иванов");
    await user.type(screen.getByLabelText("Телефон"), "+79991234567");
    await user.type(screen.getByLabelText("Email"), "ivan@example.com");
    await user.type(screen.getByLabelText("Пароль"), "Password123!");

    await user.click(
      screen.getByRole("button", { name: "Зарегистрироваться" }),
    );

    expect(
      screen.getByText("Необходимо согласие на обработку данных"),
    ).toBeInTheDocument();
    expect(authClient.signUp.email).not.toHaveBeenCalled();
    expect(push).not.toHaveBeenCalled();
  });
});
