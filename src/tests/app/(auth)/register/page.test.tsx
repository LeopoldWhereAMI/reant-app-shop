import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import RegisterPage from "@/app/(auth)/register/page";

vi.mock("@/components/auth/RegisterForm", () => ({
  default: () => <div>RegisterForm</div>,
}));

describe("RegisterPage", () => {
  it("рендерит форму регистрации", () => {
    render(<RegisterPage />);

    expect(screen.getByText("RegisterForm")).toBeInTheDocument();
  });
});
