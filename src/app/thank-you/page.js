import Link from "next/link";
import Header from "@/components/Header";

export const metadata = {
  title: "Dziękujemy! – PerfectShine",
  description: "Twoje zamówienie zostało przyjęte. Skontaktujemy się wkrótce.",
};

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FFFAEB] via-white to-[#FFF3C7]">
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
        <div className="text-8xl mb-8 animate-bounce">✨</div>
        <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tight mb-6">
          Dziękujemy!
        </h1>
        <p className="text-xl text-gray-600 mb-4 max-w-xl">
          Twoje zamówienie zostało przyjęte. Skontaktujemy się z Tobą{" "}
          <strong>w ciągu 30 minut</strong>, aby potwierdzić termin.
        </p>
        <p className="text-gray-400 text-sm mb-12 uppercase tracking-widest">
          Jeśli masz pytania, zadzwoń:
        </p>
        <a
          href="tel:+48575199937"
          className="text-4xl font-black text-ps-gold hover:text-black transition-colors mb-12"
        >
          +48 575 199 937
        </a>
        <Link
          href="/"
          className="inline-block border-2 border-black text-black px-12 py-5 rounded-full font-black uppercase tracking-[0.2em] hover:bg-black hover:text-ps-gold transition-all text-sm"
        >
          Wróć na stronę główną
        </Link>
      </div>
    </main>
  );
}