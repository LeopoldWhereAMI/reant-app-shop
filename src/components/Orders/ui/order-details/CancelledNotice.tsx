export default function CancelledNotice() {
  return (
    <div className="border-t px-5 py-4">
      <p className="text-sm font-medium text-muted-foreground">Заказ отменён</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Если оплата была произведена, деньги возвращены на баланс.
      </p>
    </div>
  );
}
