"use client";

import { usePathname } from "next/navigation";
import Navbar from "./_components/Navbar/Navbar";
import Footer from "./_components/Footer/Footer";

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  
  const pathname = usePathname();

  const isAuth = pathname.startsWith("/Authentication");

  return (
    <>
      <div className="flex flex-col min-h-screen">
        {!isAuth && <Navbar />}

        <main className="flex-1">{children}</main>

        {!isAuth && <Footer />}
      </div>
    </>
  );
}
