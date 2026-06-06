export default function HeroVideo() {
  return (
    <div className="relative aspect-square w-full overflow-hidden">
      <video
        className="absolute inset-0 size-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/dashboard/hero-poster.jpg"
      >
        <source src="/dashboard/hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-pink/15 to-pink" />
    </div>
  );
}