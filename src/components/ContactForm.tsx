"use client";
import { createContactMessageAction } from "@/actions/create-contact-message";
import { getPublicAuthData } from "@/lib/cookies/client";
import { CreateContactFormState } from "@/lib/types";
import { useFormState, useFormStatus } from "react-dom";

export default function ContactForm() {
  const initialState: CreateContactFormState = {};
  const [state, dispatch] = useFormState(createContactMessageAction, initialState);
  // const [isPending, startTransition] = useTransition();
  const { username, email } = getPublicAuthData();
  return state.success ? (
    <div className="bg-green-200 m-5 p-5">{state.success}</div>
  ) : (
    <form
      action={dispatch}
      // action={(formData) => startTransition(() => dispatch(formData))}
      className="flex flex-col gap-5 border-2 border-slate-300 p-5 m-5 justify-center items-center"
    >
      <div className="flex flex-col gap-1 w-80">
        <label>Name</label>
        <input
          title="Name"
          type="text"
          name="Name"
          className="border-2 border-slate-500 p-2"
          value={username || ""}
        />
        {state.errors?.Name && (
          <div>
            {state.errors.Name.map((err) => (
              <p key={err} className="text-red-600">
                {err}
              </p>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 w-80">
        <label>Email</label>
        <input
          title="Email"
          type="text"
          name="Email"
          className="border-2 border-slate-500 p-2"
          value={email || ""}
        />
        {state.errors?.Email && (
          <div>
            {state.errors.Email.map((err) => (
              <p key={err} className="text-red-600">
                {err}
              </p>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-1 w-80">
        <label>Message</label>
        <textarea
          title="Message"
          name="Message"
          className="border-2 border-slate-500 p-2"
        ></textarea>
        {state.errors?.Message && (
          <div>
            {state.errors.Message.map((err) => (
              <p key={err} className="text-red-600">
                {err}
              </p>
            ))}
          </div>
        )}
      </div>
      <div className="flex justify-start w-80">
        {/* <button
          type="submit"
          className="bg-blue-700 text-white p-2 disabled:bg-gray-500"
          disabled={isPending}
        >
          {isPending ? "Sending..." : "Submit"}
        </button>{" "} */}
        <SubmitButton />
      </div>
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
      {isLoading ? "Sending..." : "Submit"}
    </button>
  );
};
