export default function Loading() {
  return (
    <main
      aria-label="Loading Kinetic Moto Sports"
      className="min-h-screen bg-kinetic-base text-kinetic-text"
    >
      <section className="relative flex min-h-screen items-center overflow-hidden px-5 py-8 sm:px-8 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(45,212,191,0.18),transparent_30%),radial-gradient(circle_at_78%_62%,rgba(99,102,241,0.16),transparent_32%),linear-gradient(180deg,#05070d_0%,#07111f_76%,#030712_100%)]" />
        <div className="relative z-10 mx-auto w-full max-w-7xl">
          <div className="h-10 w-28 rounded-full bg-white/10" />
          <div className="mt-10 h-7 w-64 max-w-full rounded-full bg-cyan-100/10" />
          <div className="mt-8 h-16 max-w-4xl rounded-3xl bg-white/10 sm:h-24" />
          <div className="mt-4 h-16 max-w-3xl rounded-3xl bg-white/10 sm:h-24" />
          <div className="mt-8 h-24 max-w-2xl rounded-3xl bg-white/[0.07]" />
        </div>
      </section>
    </main>
  );
}
