import useCartConfirmModal from "@/hooks/useModal";
import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

describe("useCartConfirmModal", () => {
  it("handleOpen вызывает showModal", () => {
    const { result } = renderHook(() => useCartConfirmModal());

    const dialog = document.createElement("dialog");
    dialog.showModal = vi.fn();

    result.current.dialogRef.current = dialog;

    result.current.handleOpen();

    expect(dialog.showModal).toHaveBeenCalled();
  });

  it("handleClose вызывает close", () => {
    const { result } = renderHook(() => useCartConfirmModal());

    const dialog = document.createElement("dialog");
    dialog.close = vi.fn();

    result.current.dialogRef.current = dialog;

    result.current.handleClose();

    expect(dialog.close).toHaveBeenCalled();
  });
});
