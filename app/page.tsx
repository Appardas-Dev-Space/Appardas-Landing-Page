import Image from "next/image";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="flex items-center gap-3">
        <Image
          src="/appardas-logo.png"
          alt="appardas logo"
          width={40}
          height={40}
          className="h-10 w-auto object-contain"
          priority
        />
        <h1 className="font-display text-3xl font-bold tracking-tight lowercase text-stone-900">
          appardas
        </h1>
      </div>
      <p className="mt-4 max-w-md text-stone-600">
        SME Digitalization Solutions — Ground-up Next.js + Tailwind CSS
        template.
      </p>
    </main>
  );
}
