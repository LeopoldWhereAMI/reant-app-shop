import { getAllOrders } from "@/actions/orders/getAllOrders";
import OrderCard from "./OrderCard";
import OrdersEmpty from "./OrdersEmpty";
import OrdersPagination from "./OrdersPagination";

type Props = {
  page: number;
};

export default async function OrdersList({ page }: Props) {
  const { orders, totalPages, currentPage } = await getAllOrders(page);

  if (orders.length === 0) {
    return <OrdersEmpty />;
  }

  return (
    <>
      <ul className="grid gap-3 sm:grid-cols-3">
        {orders.map((order) => (
          <OrderCard
            id={order.id}
            createdAt={order.createdAt}
            status={order.status}
            totalPrice={order.totalPrice}
            length={order._count.items}
            key={order.id}
          />
        ))}
      </ul>

      <OrdersPagination currentPage={currentPage} totalPages={totalPages} />
    </>
  );
}
