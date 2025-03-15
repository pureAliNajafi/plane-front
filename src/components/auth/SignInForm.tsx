"use client";
import { signInAction } from "@/actions/auth/sign-in";
import { useFormState, useFormStatus } from "react-dom";
import { SignInState } from "@/lib/types";
import Link from "next/link";
import { redirect } from "next/navigation";
import useAuthStore from "@/store/authStore";

export default function SignIn() {
  const initialState: SignInState = {};
  const [state, dispatch] = useFormState(signInAction, initialState);
  const { setAuthenticateStatus } = useAuthStore();

  if (state.success) {
    setAuthenticateStatus(true); // ✅ Update Zustand on client
    redirect("/profile");
  }

  return state.message ? (
    <div className="bg-red-200 m-5 p-5">{state.message}</div>
  ) : (
    <form action={dispatch} className="flex flex-col gap-5 border-2 border-slate-300 p-5 m-5">
      <div className="flex flex-col gap-1 w-80">
        <label>Email</label>
        <input type="email" name="email" className="border-2 border-slate-500 p-2" />
        {state.errors?.email && <p className="text-red-600">{state.errors.email[0]}</p>}
      </div>

      <div className="flex flex-col gap-1 w-80">
        <label>Password</label>
        <input type="password" name="password" className="border-2 border-slate-500 p-2" />
        {state.errors?.password && <p className="text-red-600">{state.errors.password[0]}</p>}
      </div>

      <SubmitButton />
      <span className="text-gray-500">
        Dont have a account?{" "}
        <Link href={"/auth/sign-up"} className="text-blue-500">
          Sign Up
        </Link>
      </span>
    </form>
  );
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="bg-blue-700 text-white p-2 disabled:bg-gray-500"
      disabled={pending}
    >
      {pending ? "Logging in..." : "Sign In"}
    </button>
  );
};
