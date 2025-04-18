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
      <nav className="flex justify-between items-center w-full">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.png" alt="MockMate Logo" width={50} height={38} />
          <h2 className="text-primary-100">TalkScout</h2>
        </Link>

        <form action={signOut}>
          <Button type="submit" className="btn-secondary">
            Logout
          </Button>
        </form>
      </nav>

      {children}
    </div>
  );
};

export default Layout;
