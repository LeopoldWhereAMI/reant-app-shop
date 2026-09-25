import { requireAuth } from "@/lib/auth-utils";

export default async function ProfilePage() {
  const session = await requireAuth();

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight">Профиль</h1>

        <div className="mt-8 space-y-4 rounded-xl border bg-card p-6">
          <div>
            <p className="text-sm text-muted-foreground">Имя</p>
            <p className="mt-1 font-medium">{session.user.name}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="mt-1 font-medium">{session.user.email}</p>
          </div>

          <div>
            <p className="text-sm text-muted-foreground">Телефон</p>
            <p className="mt-1 font-medium">{session.user.phoneNumber}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
