import Image from "next/image";
import { Headphones, Lock, Truck } from "lucide-react";
import LeftSide from "../_components/LeftSide/LeftSide";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 flex-col items-center justify-center p-10 bg-gray-50">

         <LeftSide /> 
      </div>

      {/* RIGHT SIDE */}
<div className="w-full md:w-1/2 flex items-center justify-center min-h-screen md:min-h-0 p-4">
        <div className="w-full max-w-xl bg-white p-6 rounded-xl shadow-md">
          {children}
        </div>
      </div>

    </div>
  );
}