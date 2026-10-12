import { getWallet } from "@/actions/wallet/getWallet";
import WalletHistory from "../WalletHistory/ui/WalletHistory";
import BalanceDeposit from "./BalanceDeposit";

export default async function BalanceCard() {
  const wallet = await getWallet();

  return (
    <section className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex flex-col gap-5">
        <div>
          <p className="text-sm text-muted-foreground">Баланс</p>

          <p className="mt-1 text-2xl font-semibold text-price">
            {wallet?.balance.toLocaleString("ru-RU") ?? "0"} ₽
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <BalanceDeposit />
          <WalletHistory />
        </div>

        {wallet?.balance === 0 && (
          <p className="text-sm text-muted-foreground">
            Пополните баланс, чтобы оплачивать аренду инструментов.
          </p>
        )}
      </div>
    </section>
  );
}
