"use client";
import { signIn } from "next-auth/react";

function page() {
  return <button onClick={() => signIn()}>Sign In</button>;
}
export default page;
