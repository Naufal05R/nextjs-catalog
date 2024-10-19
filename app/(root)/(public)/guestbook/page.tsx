import { GuestbookForm } from "@/components/client/Form";

export default function GuestbookPage() {
  return (
    <section className="pt-16">
      <h4 className="mb-4 text-3xl">Guestbook</h4>
      <p>Welcome to our Guest Book! Share your shopping experience and provide valuable feedback here.</p>

      <GuestbookForm />
    </section>
  );
}
