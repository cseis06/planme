type WindowChromeProps = {
  title: string;
};

export default function WindowChrome({ title }: WindowChromeProps) {
  return (
    <div className="flex items-center justify-between border-b-2 border-dashed border-brown-line/15 px-4 py-2">
      <span className="text-[11px] font-medium tracking-wide text-ink-soft">
        {title}
      </span>
      <span className="flex items-center gap-1.5" aria-hidden>
        <span className="size-2.5 rounded-full bg-pink-deep/70" />
        <span className="size-2.5 rounded-full bg-butter" />
        <span className="size-2.5 rounded-full bg-sage" />
      </span>
    </div>
  );
}