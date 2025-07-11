"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function InterviewButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
    router.push("/interview");
  };

  return (
    <Button
      onClick={handleClick}
      className="btn-primary max-sm:w-full"
      disabled={isLoading}
    >
      {isLoading ? "Connecting..." : "Start an Interview"}
    </Button>
  );
}
