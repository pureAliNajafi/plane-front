import ContactForm from "@/components/ContactForm";
import { createContactMessage } from "@/lib/api";
const Page = () => {
  return <ContactForm />;
};
/* const Page = async () => {
  await createContactMessage({
    Name: "test2",
    Email: "test2@mail.com",
    Message: "Lorem Text 2",
  });

  return <div>Message Sent</div>;
}; */

export default Page;
