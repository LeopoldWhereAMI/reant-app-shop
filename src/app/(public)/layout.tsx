import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
