"use client";

function EmailInput({ register }: { register: any }) {
  return (
    <input
      name="email"
      className="outline-none w-3/5 py-2 px-3 rounded-md text-black placeholder:text-slate-700 border border-slate-900"
      type="email"
      placeholder="Insira seu email"
      {...register}
    />
  );
}

export default EmailInput;
