import { GuestbookForm } from "@/components/client/Form";

export default function GuestbookPage() {
  return (
    <section className="pt-8">
      <h4 className="mb-4 text-3xl">Guestbook</h4>
      <p className="text-sm text-slate-500">Welcome to our Guest Book! Share your shopping experience and provide valuable feedback here.</p>

      <GuestbookForm />
    </section>
  );
}
