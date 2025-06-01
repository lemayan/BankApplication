import Sidebar from "@/components/Sidebar";
import { redirect } from "next/dist/server/api-utils";
import { Children } from "react";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn = {firstName : 'Ivy', lastName: 'Mwikali'}; // Simulating a logged-in user



  return (
   <main className="flex h-screen w-full font-inter">
    <Sidebar user = {loggedIn}/>
    {children}
   </main>
  );
}

