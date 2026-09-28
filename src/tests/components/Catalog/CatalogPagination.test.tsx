import CatalogPagination from "@/components/Catalog/CatalogPagination";
import { screen, render, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, describe, expect, it, vi } from "vitest";

type CatalogPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
};

const getProps = (
  overrides: Partial<CatalogPaginationProps> = {},
): CatalogPaginationProps => ({
  currentPage: 1,
  totalPages: 5,
  onPrev: () => {},
  onNext: () => {},
  ...overrides,
});

describe("CatalogPagination", () => {
  it("показывает текущую страницу и общее количество страниц", () => {
    const props = getProps();

    render(<CatalogPagination {...props} />);

    expect(screen.getByText("1 / 5")).toBeInTheDocument();
  });

  it("состояние кнопки предыдущей страницы disabled, если выбрана первая страница", () => {
    const props = getProps();

    render(<CatalogPagination {...props} />);

    expect(
      screen.getByRole("button", { name: "Предыдущая страница" }),
    ).toBeDisabled();
  });

  it("состояние кнопки предыдущей страницы НЕ disabled, если выбрана вторая страница", () => {
    const props = getProps({
      currentPage: 2,
    });

    render(<CatalogPagination {...props} />);

    expect(
      screen.getByRole("button", { name: "Предыдущая страница" }),
    ).not.toBeDisabled();
  });

  it("состояние кнопки следующей страницы  disabled, если выбрана последняя страница", () => {
    const props = getProps({
      currentPage: 5,
    });

    render(<CatalogPagination {...props} />);

    expect(
      screen.getByRole("button", { name: "Следующая страница" }),
    ).toBeDisabled();
  });

  it("состояние кнопки следующей страницы  НЕ disabled, если выбрана НЕ последняя страница", () => {
    const props = getProps({
      currentPage: 4,
    });

    render(<CatalogPagination {...props} />);

    expect(
      screen.getByRole("button", { name: "Следующая страница" }),
    ).not.toBeDisabled();
  });

  it("при клике на предыдущую кнопку вызывается onPrev", async () => {
    const mockPrev = vi.fn();
    const user = userEvent.setup();

    const props = getProps({
      currentPage: 4,
      onPrev: mockPrev,
    });

    render(<CatalogPagination {...props} />);

    await user.click(
      screen.getByRole("button", { name: "Предыдущая страница" }),
    );

    expect(mockPrev).toHaveBeenCalledTimes(1);
  });

  it("при клике на следующую кнопку вызывается onNext", async () => {
    const mockNext = vi.fn();
    const user = userEvent.setup();

    const props = getProps({
      onNext: mockNext,
    });

    render(<CatalogPagination {...props} />);

    await user.click(
      screen.getByRole("button", { name: "Следующая страница" }),
    );

    expect(mockNext).toHaveBeenCalledTimes(1);
  });
});
