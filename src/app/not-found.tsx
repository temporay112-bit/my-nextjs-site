import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
      <p className="font-sora text-xs font-bold uppercase tracking-widest-brand text-electric-lime">
        404
      </p>
      <h1 className="font-sora text-3xl md:text-4xl font-extrabold uppercase text-slots-black mt-3">
        Page not found
      </h1>
      <p className="font-inter text-technical-grey mt-4 max-w-xl">
        The page you requested is not available. Return home or send a quote inquiry.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex items-center justify-center font-sora font-bold uppercase text-xs tracking-wider px-6 py-3 bg-electric-lime text-slots-black rounded-full hover:bg-[#a8eb00] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slots-black focus-visible:ring-offset-2"
        >
          Back to home
        </Link>
        <Link
          href="/#quote"
          className="inline-flex items-center justify-center font-sora font-bold uppercase text-xs tracking-wider px-6 py-3 border border-slots-black text-slots-black rounded-full hover:bg-slots-black hover:text-slots-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slots-black focus-visible:ring-offset-2"
        >
          Get a quote
        </Link>
      </div>
    </div>
  );
}
