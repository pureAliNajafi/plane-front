import { z } from "zod";

const schema = z.object({
  Name: z.string().min(1, { message: "Name is required" }),
  Email: z.string().email({ message: "Invalid email address" }),
  Message: z.string().max(1000, { message: "Message cannot exceed 1000 characters" }),
});

const ContactForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    const result = schema.safeParse(data);

    if (result.success) {
      onSubmit(result.data);
    } else {
      console.error(result.error.flatten());
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-4 border border-gray-300 rounded">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="Name" className="block text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="Name"
            name="Name"
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="Email"
            name="Email"
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="Message" className="block text-gray-700">
            Message
          </label>
          <textarea
            id="Message"
            name="Message"
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
