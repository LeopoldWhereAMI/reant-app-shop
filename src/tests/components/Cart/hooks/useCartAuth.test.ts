import useCartAuth from "@/components/Cart/hooks/useCartAuth";
import { authClient } from "@/lib/auth/auth-client";
import { renderHook } from "@testing-library/react";
import { useRouter } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";

const push = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: vi.fn(),
}));

vi.mock("@/lib/auth/auth-client", () => ({
  authClient: {
    useSession: vi.fn(),
  },
}));

describe("useCartAuth", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useRouter).mockReturnValue({
      push,
    } as unknown as ReturnType<typeof useRouter>);

    vi.mocked(authClient.useSession).mockReturnValue({
      data: null,
      isPending: false,
      isRefetching: false,
      error: null,
      refetch: vi.fn(),
    });
  });

  it("возвращает true для авторизованного пользователя", () => {
    vi.mocked(authClient.useSession).mockReturnValue({
      data: { user: {} },
      isPending: false,
      isRefetching: false,
      error: null,
      refetch: vi.fn(),
    } as unknown as ReturnType<typeof authClient.useSession>);

    const { result } = renderHook(() => useCartAuth());

    expect(result.current.isAuthLoading).toBe(false);
    expect(result.current.requireAuth()).toBe(true);
    expect(push).not.toHaveBeenCalled();
  });

  it("перенаправляет на логин, если пользователь не авторизован", () => {
    const { result } = renderHook(() => useCartAuth());

    expect(result.current.requireAuth()).toBe(false);
    expect(push).toHaveBeenCalledWith("/login?next=%2Fcart");
  });

  it("возвращает false при isPending: true, редирект не происходит", () => {
    vi.mocked(authClient.useSession).mockReturnValue({
      data: null,
      isPending: true,
      isRefetching: false,
      error: null,
      refetch: vi.fn(),
    });

    const { result } = renderHook(() => useCartAuth());

    expect(result.current.isAuthLoading).toBe(true);
    expect(result.current.requireAuth()).toBe(false);
    expect(push).not.toHaveBeenCalled();
  });
});
