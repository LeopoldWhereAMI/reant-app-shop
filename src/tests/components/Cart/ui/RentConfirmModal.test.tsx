import RentConfirmModal, {
  type ModalProps,
} from "@/components/Cart/ui/RentConfirmModal";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

const modalProps: ModalProps = {
  rentItemNames: ["Бензопила"],
  rentItemPrice: 1000,
  dialogRef: createRef<HTMLDialogElement>(),
  handleClose: vi.fn(),
  handleSubmit: vi.fn(),
  loading: false,
  error: null,
};

const renderModal = (props = modalProps) => {
  render(<RentConfirmModal {...props} />);

  const dialog = screen.getByRole("dialog", { hidden: true });
  dialog.setAttribute("open", "");
};

describe("RentConfirmModal", () => {
  it("показывает название инструмента", () => {
    renderModal();

    expect(screen.getByText("Бензопила")).toBeInTheDocument();
  });

  it("показывает сумму к оплате", () => {
    renderModal();

    expect(screen.getByText("1000 ₽")).toBeInTheDocument();
  });

  it("при ошибке показывает сообщение об ошибке", () => {
    renderModal({
      ...modalProps,
      error: "Ошибка сервера",
    });

    expect(
      screen.getByText("Не удалось создать заказ. Ошибка сервера"),
    ).toBeInTheDocument();
  });

  it("вызывает handleClose при клике по кнопке Отменить", async () => {
    renderModal();

    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: "Отменить" }));

    expect(modalProps.handleClose).toHaveBeenCalledTimes(1);
  });

  it("вызывает handleSubmit при клике по кнопке Подтвердить", async () => {
    renderModal();

    const user = userEvent.setup();

    await user.click(screen.getByRole("button", { name: "Подтвердить" }));

    expect(modalProps.handleSubmit).toHaveBeenCalledTimes(1);
  });

  it("кнопка Отменить заблокирована при loading", () => {
    renderModal({
      ...modalProps,
      loading: true,
    });

    expect(screen.getByRole("button", { name: "Отменить" })).toBeDisabled();
  });

  it("кнопка Подтвердить заблокирована при loading", () => {
    renderModal({
      ...modalProps,
      loading: true,
    });

    expect(
      screen.getByRole("button", { name: "Оформление..." }),
    ).toBeDisabled();
  });
});
