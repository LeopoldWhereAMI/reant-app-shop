const ORDER_STATUS_LABELS = {
  PENDING: "Ожидает подтверждения",
  CONFIRMED: "Подтверждён",
  CANCELLED: "Отменён",
  COMPLETED: "Завершён",
} as const;

export function formatOrderStatus(status: keyof typeof ORDER_STATUS_LABELS) {
  return ORDER_STATUS_LABELS[status];
}

export type OrderStatusType = keyof typeof ORDER_STATUS_LABELS;
