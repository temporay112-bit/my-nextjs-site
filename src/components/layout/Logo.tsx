import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showWordmark?: boolean;
}

export function Logo({ className, showWordmark = true }: LogoProps) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-3 md:gap-3.5 focus-visible:ring-2 focus-visible:ring-slots-black focus-visible:ring-offset-2 rounded-sm transition-opacity duration-200 hover:opacity-95",
        className
      )}
      aria-label="SLOTS SPORTSWEAR — Home"
    >
      <div className="relative flex items-center justify-center w-10 h-10 md:w-11 md:h-11 flex-shrink-0">
        <Image
          src="/images/logo.png"
          alt="SLOTS SPORTSWEAR Logo Mark"
          width={44}
          height={44}
          priority
          className="object-contain w-full h-full"
        />
      </div>
      {showWordmark && (
        <div className="flex flex-col justify-center select-none">
          <span className="font-sora text-[22px] md:text-[25px] font-extrabold tracking-tight text-slots-black leading-none uppercase">
            SLOTS
          </span>
          <span className="font-inter text-[8px] md:text-[9.5px] font-bold tracking-[0.28em] text-slots-black leading-tight uppercase mt-1 pl-[1px]">
            SPORTSWEAR
          </span>
        </div>
      )}
    </Link>
  );
}
