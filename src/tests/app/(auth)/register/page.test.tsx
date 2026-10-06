import RegisterPage from "@/app/(auth)/register/page";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/components/auth/RegisterForm", () => ({
  default: () => <div>RegisterForm</div>,
}));

describe("RegisterPage", () => {
  it("рендерит форму регистрации", () => {
    render(<RegisterPage />);

    expect(screen.getByText("RegisterForm")).toBeInTheDocument();
  });
});
