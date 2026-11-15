import Link from "next/link";
import type { ReactNode } from "react";

const AuthShell = ({ children }: { children: ReactNode }) => {
  return (
    <main className="relative flex min-h-[calc(100dvh-64px)] flex-1 flex-col items-center justify-center overflow-hidden bg-[#050609] px-4 py-14">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-[460px] w-[760px] max-w-full -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(99,102,241,0.12),transparent)]"
      />

      <div className="relative z-10 w-full max-w-md">
        <Link
          href="/"
          className="mx-auto flex w-fit text-2xl/[1] font-bold tracking-tight text-zinc-100"
        >
          <span className="text-indigo-400">h</span>irel
          <span className="text-orange-500">oo</span>
          <span className="text-indigo-400">p</span>
        </Link>

        <div className="mt-6 rounded-2xl border border-white/10 bg-[#0F1116]/90 p-6 shadow-xl shadow-black/40 backdrop-blur-sm sm:p-8">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AuthShell;
