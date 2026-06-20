import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { isAuthenticated, signOut } from "@/lib/actions/auth.action";

const Layout = async ({ children }: { children: ReactNode }) => {
  const isUserAuthenticated = await isAuthenticated();
  if (!isUserAuthenticated) redirect("/sign-in");

  return (
    <div className="root-layout">
      {/* ── Neo-Brutalist nav bar ── */}
      <nav className="flex justify-between items-center w-full pb-6 border-b-[3px] border-nb-black">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="border-[3px] border-nb-black shadow-[3px_3px_0px_#111111] rounded-xl overflow-hidden group-active:translate-x-[2px] group-active:translate-y-[2px] group-active:shadow-[1px_1px_0px_#111111] transition-none">
            <Image
              src="/logo.png"
              alt="TalkScout Logo"
              width={48}
              height={36}
            />
          </div>
          <span className="text-xl font-black uppercase tracking-tight text-nb-black">
            TalkScout
          </span>
        </Link>

        <form action={signOut}>
          <Button type="submit" variant="secondary" size="default">
            Logout
          </Button>
        </form>
      </nav>

      {children}
    </div>
  );
};

export default Layout;
