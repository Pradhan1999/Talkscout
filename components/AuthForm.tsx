"use client";

import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { auth } from "@/firebase/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { signIn, signUp } from "@/lib/actions/auth.action";
import FormField from "./FormField";

const authFormSchema = (type: FormType) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3) : z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = authFormSchema(type);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      if (type === "sign-up") {
        const { name, email, password } = data;
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const result = await signUp({ uid: userCredential.user.uid, name: name!, email, password });
        if (!result.success) { toast.error(result.message); return; }
        toast.success("Account created successfully. Please sign in.");
        router.push("/sign-in");
      } else {
        const { email, password } = data;
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const idToken = await userCredential.user.getIdToken();
        if (!idToken) { toast.error("Sign in Failed. Please try again."); return; }
        await signIn({ email, idToken });
        toast.success("Signed in successfully.");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(`There was an error: ${error}`);
    } finally {
      setTimeout(() => setIsLoading(false), 2000);
    }
  };

  const isSignIn = type === "sign-in";

  return (
    /* Neo-Brutalist auth card: white bg, thick border, hard shadow, rounded */
    <div className="w-full max-w-[520px] bg-nb-white border-[3px] border-nb-black rounded-2xl shadow-[8px_8px_0px_#111111]">
      <div className="flex flex-col gap-7 py-12 px-10">

        {/* ── logo + brand ── */}
        <div className="flex flex-col items-center gap-3">
          <div className="border-[3px] border-nb-black shadow-[4px_4px_0px_#F5C800] rounded-2xl overflow-hidden">
            <Image src="/logo.png" alt="logo" height={48} width={120} />
          </div>
          <div className="text-center">
            <h2 className="text-nb-black text-2xl">TalkScout</h2>
            <p className="text-nb-black/60 text-sm font-medium mt-1">
              AI-Powered Interview Platform
            </p>
          </div>
        </div>

        {/* ── accent strip ── */}
        <div className="h-[3px] bg-nb-yellow border-x-0 border-nb-black w-full" />

        {/* ── heading ── */}
        <div>
          <h3 className="text-nb-black text-lg">
            {isSignIn ? "Welcome back" : "Create your account"}
          </h3>
          <p className="text-nb-black/55 text-sm font-medium mt-1">
            {isSignIn
              ? "Sign in to continue practising interviews."
              : "Get started with AI-powered mock interviews."}
          </p>
        </div>

        {/* ── form ── */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-5 form"
          >
            {!isSignIn && (
              <FormField
                control={form.control}
                name="name"
                label="Full Name"
                placeholder="Your name"
                type="text"
              />
            )}
            <FormField
              control={form.control}
              name="email"
              label="Email Address"
              placeholder="you@example.com"
              type="email"
            />
            <FormField
              control={form.control}
              name="password"
              label="Password"
              placeholder="••••••••"
              type="password"
            />

            <Button className="btn w-full" type="submit" disabled={isLoading}>
              {isLoading
                ? isSignIn ? "Signing in…" : "Creating Account…"
                : isSignIn ? "Sign In" : "Create Account"}
            </Button>
          </form>
        </Form>

        {/* ── switch link ── */}
        <p className="text-center text-sm font-medium text-nb-black/70">
          {isSignIn ? "Don't have an account?" : "Already have an account?"}
          <Link
            href={isSignIn ? "/sign-up" : "/sign-in"}
            className="ml-1.5 font-black text-nb-black underline decoration-nb-yellow decoration-2 underline-offset-2 hover:text-nb-purple transition-none"
          >
            {isSignIn ? "Sign Up" : "Sign In"}
          </Link>
        </p>

      </div>
    </div>
  );
};

export default AuthForm;
