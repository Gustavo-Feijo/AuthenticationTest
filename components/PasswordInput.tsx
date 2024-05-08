"use client";

import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa6";

//Password input for the react hook form, receiving the register to store the password.
function PasswordInput({ register }: { register: any }) {
  //useState to alternate between hidden and visible passwords.
  const [isVisible, setVisible] = useState<boolean>(false);
  return (
    <div className="w-3/5 relative">
      <input
        name="password"
        className="outline-none w-full py-2 px-3 rounded-md text-black placeholder:text-slate-700 border border-slate-900 relative"
        placeholder="Type your password."
        type={isVisible ? "text" : "password"}
        {...register}
      />
      {isVisible ? (
        <FaEye
          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
          onClick={() => {
            setVisible(false);
          }}
        />
      ) : (
        <FaEyeSlash
          className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
          onClick={() => {
            setVisible(true);
          }}
        />
      )}
    </div>
  );
}

export default PasswordInput;
