import Image from "next/image";
import WindowChrome from "./WindowChrome";

type WelcomeWindowProps = {
  userName: string;
  dateLabel: string;
  avatarUrl: string | null;
};

export default function WelcomeWindow({
  userName,
  dateLabel,
  avatarUrl,
}: WelcomeWindowProps) {
  return (
    <article className="overflow-hidden rounded-3xl border border-brown-line/20 bg-sage-soft/40 shadow-sm">
      <WindowChrome title="PLANME.HOME" />
      <div className="flex items-center gap-4 p-4">
        <div className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-brown-line/50 bg-paper">
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt={userName}
              width={64}
              height={64}
              className="size-full object-cover opacity-90"
            />
          ) : (
            <span className="px-1 text-center text-[10px] leading-tight text-ink-soft">
              browse files
            </span>
          )}
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-medium uppercase tracking-wide text-pink-deep">
            {dateLabel}
          </span>
          <h1 className="text-2xl text-ink">¡Hola, {userName}!</h1>
          <p className="text-sm text-ink-soft">Un día a la vez.</p>
        </div>
      </div>
    </article>
  );
}