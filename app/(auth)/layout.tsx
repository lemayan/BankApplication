import Image from "next/image";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen w-full font-inter justify-between bg-white">
      <div className="flex flex-1 items-center justify-center">
        {children}
      </div>
      <div className="hidden md:flex flex-1 items-center justify-center bg-[#f5faff]">
        <div className="rounded-2xl shadow-lg border-4 border-violet-600 p-8 bg-white">
          <Image
            src="/icons/face3.png"
            alt="auth-image"
            width={1000}
            height={1000}
            className="object-contain rounded-xl w-[700px] h-[700px] max-w-full max-h-[80vh]"
            priority
          />
        </div>
      </div>
    </main>
  );
}
