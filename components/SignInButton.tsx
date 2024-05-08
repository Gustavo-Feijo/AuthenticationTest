"use client";
import { signIn } from "next-auth/react";

function SignInButton() {
  return (
    <button
      className="w-full h-16 bg-slate-900 text-slate-100 rounded-xl"
      onClick={() => signIn()}
    >
      Login
    </button>
  );
}

export default SignInButton;
