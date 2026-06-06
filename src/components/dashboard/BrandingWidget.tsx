import Image from "next/image";

export default function BrandingWidget() {
  return (
    <div className="col-span-1 flex items-center justify-center rounded-3xl border border-brown-line/20 bg-paper p-3">
      <Image
        src="/logo.png"
        alt="Planme"
        width={56}
        height={56}
        className="size-12 object-contain"
      />
    </div>
  );
}