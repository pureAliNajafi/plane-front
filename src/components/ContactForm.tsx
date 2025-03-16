"use client";
import { createContactMessageAction } from "@/actions/create-contact-message";
import { getPublicAuthData } from "@/lib/cookies/client";
import { CreateContactFormState } from "@/lib/types";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

export default function ContactForm() {
  const initialState: CreateContactFormState = {};
  const [state, dispatch] = useFormState(createContactMessageAction, initialState);

  // ✅ Ensure userdata is never `null`
  const [userdata, setUserdata] = useState<{ username: string; email: string }>({
    username: "",
    email: "",
  });

  useEffect(() => {
    const { username, email } = getPublicAuthData();
    if (username && email) {
      setUserdata({ username, email });
    }
  }, []);

  return state.success ? (
    <div className="bg-green-200 m-5 p-5">{state.success}</div>
  ) : (
    <form
      action={dispatch}
      className="flex flex-col gap-5 border-2 border-slate-300 p-5 m-5 justify-center items-center"
    >
      <div className="flex flex-col gap-1 w-80">
        <label>Name</label>
        <input
          title="Name"
          type="text"
          name="Name"
          className="border-2 border-slate-500 p-2"
          value={userdata?.username || ""}
          readOnly
        />
      </div>
      <div className="flex flex-col gap-1 w-80">
        <label>Email</label>
        <input
          title="Email"
          type="text"
          name="Email"
          className="border-2 border-slate-500 p-2"
          value={userdata?.email || ""}
          readOnly
        />
      </div>
      <div className="flex flex-col gap-1 w-80">
        <label>Message</label>
        <textarea
          title="Message"
          name="Message"
          className="border-2 border-slate-500 p-2"
        ></textarea>
      </div>
      <div className="flex justify-start w-80">
        <SubmitButton />
      </div>
    </form>
  );
}

const SubmitButton = () => {
  const data = useFormStatus();
  return (
    <button
      type="submit"
      className="bg-blue-700 text-white p-2 disabled:bg-gray-500"
      disabled={data.pending}
    >
      {data.pending ? "Sending..." : "Submit"}
    </button>
  );
};
