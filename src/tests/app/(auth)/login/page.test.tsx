import LoginPage from "@/app/(auth)/login/page";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/components/auth/LoginForm", () => ({
  default: () => <div>LoginForm</div>,
}));

describe("LoginPage", () => {
  it("рендерит форму логина", () => {
    render(<LoginPage />);

    expect(screen.getByText("LoginForm")).toBeInTheDocument();
  });
});
