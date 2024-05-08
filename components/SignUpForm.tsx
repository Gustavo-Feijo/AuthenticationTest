"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PasswordInput from "@/components/PasswordInput";
import EmailInput from "@/components/EmailInput";

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type SignUp = z.infer<typeof signUpSchema>;

//Simple signUp schema with Zod and React-Hook-Form.
function SignUpForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUp>({
    resolver: zodResolver(signUpSchema),
  });

  const [serverMessage, setServerMessage] = useState("");
  const router = useRouter();

  async function onSubmit(data: SignUp) {
    const result = await fetch("/api/signup", {
      method: "POST", // Specify the method
      headers: {
        "Content-Type": "application/json", // Specify the content type in the headers
      },
      body: JSON.stringify({
        // Stringify the body to ensure it is in JSON format
        email: data.email,
        password: data.password,
      }),
    });
    const res = await result.json();
    if (!result.ok) {
      setServerMessage(res.error);
    } else {
      setServerMessage(res.message + "Redirecting to login screen...");
      setTimeout(() => {
        router.push("/auth/signin");
      }, 1000);
    }
  }

  return (
    <form
      className="h-[450px] w-96 flex flex-col bg-slate-200 rounded-2xl justify-around items-center py-10"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-5xl text-slate-900 font-extrabold">Sign Up</h1>
      <div className="flex flex-col  w-full items-center text-slate-900">
        <EmailInput register={register("email")} />
        <p className="h-2">{errors.email && "Invalid email."}</p>
      </div>
      <div className="flex flex-col  w-full items-center text-slate-900">
        <PasswordInput register={register("password")} />
        <p className="h-2">
          {errors.password && "Password must be at least 8 characters long."}
        </p>
      </div>
      <div className="flex flex-col items-center">
        <button
          type="submit"
          className="bg-slate-900 px-6 py-4 rounded-lg transition-colors duration-500 hover:bg-slate-500"
        >
          SignUp
        </button>
        <p className="h-2 text-black font-bold text-wrap">{serverMessage}</p>
      </div>
    </form>
  );
}

export default SignUpForm;
