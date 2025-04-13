import Agent from "@/components/Agent";
import { getCurrentUser } from "@/lib/actions/auth.action";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const Page = async () => {
  const user = await getCurrentUser();

  return (
    <>
      <div className="flex gap-2 items-center">
        <Link href="/">
          <ArrowLeft className="w-6 h-6" />
        </Link>

        <h3>Interview generation</h3>
      </div>

      <Agent
        userName={user?.name || "there"}
        userId={user?.id}
        type="generate"
      />
    </>
  );
};

export default Page;
