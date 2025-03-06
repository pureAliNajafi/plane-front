"use client";
import { signUpAction } from "@/actions/sign-up";
import { SignUpFormState } from "@/lib/types";
import { useFormState, useFormStatus } from "react-dom";

export default function SignUpForm() {
  const initialState: SignUpFormState = {};
  const [state, dispatch] = useFormState(signUpAction, initialState);

  return state.success ? (
    <div className="bg-green-200 m-5 p-5">{state.success}</div>
  ) : state.message ? (
    <div className="bg-red-200 m-5 p-5">{state.message}</div>
  ) : (
    <form action={dispatch} className="flex flex-col gap-5 border-2 border-slate-300 p-5 m-5">
      <div className="flex flex-col gap-1 w-80">
        <label>Username</label>
        <input type="text" name="username" className="border-2 border-slate-500 p-2" />
        {state.errors?.username && <p className="text-red-600">{state.errors.username[0]}</p>}
      </div>

      <div className="flex flex-col gap-1 w-80">
        <label>Email</label>
        <input type="text" name="email" className="border-2 border-slate-500 p-2" />
        {state.errors?.email && <p className="text-red-600">{state.errors.email[0]}</p>}
      </div>

      <div className="flex flex-col gap-1 w-80">
        <label>Password</label>
        <input type="password" name="password" className="border-2 border-slate-500 p-2" />
        {state.errors?.password && <p className="text-red-600">{state.errors.password[0]}</p>}
      </div>

      <SubmitButton />
    </form>
  );
}

const SubmitButton = () => {
  const data = useFormStatus();
  const isLoading = data.pending;

  return (
    <button
      type="submit"
      className="bg-blue-700 text-white p-2 disabled:bg-gray-500"
      disabled={isLoading}
    >
      {isLoading ? "Creating Account..." : "Sign Up"}
    </button>
  );
};
