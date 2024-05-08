"use client";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

function Authentication() {
  return (
    <div className="flex gap-6">
      <SignInForm />
      <SignUpForm />
    </div>
  );
}

export default Authentication;
