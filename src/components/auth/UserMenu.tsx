"use client";

import Link from "next/link";
import { LogOut, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function UserMenu() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  if (!session?.user) {
    return (
      <Link
        href="/login"
        aria-label="Войти"
        title="Войти"
        className="inline-flex size-8 items-center justify-center rounded-lg transition-colors outline-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <User className="size-5" />
      </Link>
    );
  }

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/login");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label="Меню пользователя"
        title="Меню пользователя"
        className="inline-flex size-8 items-center justify-center rounded-lg outline-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <User className="size-5" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuGroup>
          <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>

          <DropdownMenuItem onClick={() => router.push("/profile")}>
            <User />
            Профиль
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut />
            Выйти
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
