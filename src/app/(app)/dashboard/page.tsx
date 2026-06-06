import { createClient } from "@/lib/supabase/server";
import { getDashboardSummary } from "@/lib/dashboard";
import { formatTodayLabel } from "@/lib/date";
import HeroVideo from "@/components/dashboard/HeroVideo";
import WelcomeWindow from "@/components/dashboard/WelcomeWindow";
import BalanceWidget from "@/components/dashboard/BalanceWidget";
import ShoppingWidget from "@/components/dashboard/ShoppingWidget";
import BrandingWidget from "@/components/dashboard/BrandingWidget";
import NextEventWidget from "@/components/dashboard/NextEventWidget";
import ReminderWindow from "@/components/dashboard/ReminderWindow";

export default async function DashboardPage() {
  const supabase = await createClient();

  const [{ data }, summary] = await Promise.all([
    supabase.auth.getUser(),
    getDashboardSummary(),
  ]);

  const user = data.user;
  const userName =
    (user?.user_metadata?.full_name as string | undefined) ??
    user?.email?.split("@")[0] ??
    "amiga";
  const avatarUrl =
    (user?.user_metadata?.avatar_url as string | undefined) ?? null;

  return (
    <main className="flex w-full flex-col justify-center items-center">
      <div className="bg-pink">
        <div className="-z-10">
          <HeroVideo />
        </div>
        <div className="flex w-full flex-col px-7 pt-9 gap-4 rounded-t-4xl bg-white">
          <WelcomeWindow
            userName={userName}
            avatarUrl={avatarUrl}
            dateLabel={formatTodayLabel()}
          />
          <section className="grid grid-cols-6 gap-3">
            <BalanceWidget balance={summary.balance} />
            <ShoppingWidget />
            <BrandingWidget />
            <NextEventWidget event={summary.nextEvent} />
          </section>
          <ReminderWindow />
        </div>
      </div>
    </main>
  );
}