"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Headphones,
  KeyRound,
  Lock,
  MailCheck,
  Shield,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";

export default function LeftSide() {
  const pathname = usePathname();

  const isLogin = pathname.toLowerCase().includes("login");
  const isRegister = pathname.toLowerCase().includes("register");
  const isForgetpassword = pathname.toLowerCase().includes("/forgot-password");
const isResetPassword = pathname.toLowerCase().includes("reset-password");
const isVerifyPassword = pathname.toLowerCase().includes("verify-reset-code");

  return (
    <div className="flex flex-col items-center max-w-xl w-full">
      {/* LOGIN DESIGN */}
      {isLogin && (
        <>
          <div className="flex flex-col items-center max-w-xl w-full">
            {/* IMAGE */}
            <Image
              src="/authphoto.png"
              alt="FreshCart"
              width={500}
              height={400}
              className="w-full mb-6"
            />

            {/* TEXT */}
            <h1 className="text-3xl lg:text-3xl font-bold text-center text-[#1E2939]">
              FreshCart - Your One-Stop Shop for Fresh Products
            </h1>

            <p className="text-[#4A5565] text-center mt-4">
              Join thousands of happy customers who trust FreshCart for their
              daily grocery needs
            </p>

            {/* FEATURES */}
            <div className="flex flex-col lg:flex-row gap-4 mt-8 text-sm text-[#6A7282]">
              <div className="flex items-center gap-2">
                <Truck className="text-green-500" size={18} />
                <span className="font-medium">Free Delivery</span>
              </div>

              <div className="flex items-center gap-2">
                <Lock className="text-green-500" size={18} />
                <span className="font-medium">Secure Payment</span>
              </div>

              <div className="flex items-center gap-2">
                <Headphones className="text-green-500" size={18} />
                <span className="font-medium">24/7 Support</span>
              </div>
            </div>
          </div>
        </>
      )}

      {/* REGISTER DESIGN */}
      {isRegister && (
        <>
          <div className="flex flex-col items-start max-w-xl w-full">
            {/* TITLE */}
            <h1 className="text-3xl font-bold text-start text-[#1E2939]">
              Welcome to <span className="text-[#16A34A]">FreshCart</span>
            </h1>

            <p className="text-[#4A5565] text-start mt-3 text-xl">
              Join thousands of happy customers who enjoy fresh groceries
              delivered right to their doorstep.
            </p>

            {/* FEATURES */}
            <div className="mt-6 flex flex-col gap-4 text-sm text-[#6A7282] w-full">
              <div className="flex items-center gap-2 text-lg">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#DCFCE7]">
                  <Star className="text-green-600" size={25} />
                </div>
                <div>
                  <p className="font-semibold">Premium Quality</p>
                  <p>
                    Premium quality products sourced from trusted suppliers.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-lg">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#DCFCE7]">
                  <Shield className="text-green-600" size={25} />
                </div>{" "}
                <div>
                  <p className="font-semibold">Fast Delivery</p>
                  <p>Same-day delivery available in most areas</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-lg">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#DCFCE7]">
                  <Truck className="text-green-600" size={25} />
                </div>{" "}
                <div>
                  <p className="font-semibold">Secure Shopping</p>
                  <p>Your data and payments are completely secure</p>
                </div>
              </div>
            </div>

            {/* TESTIMONIAL */}
            <div className="mt-8 bg-white p-5 rounded-xl shadow-sm text-start space-y-3">
              {/* TESTIMONIAL TEXT */}

              <div className="flex items-center gap-3">
                {/* AVATAR */}
                <Image
                  src="/avatar.jpg"
                  alt="Sarah Johnson"
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                />

                <div>
                  <p className="font-semibold text-[#1E2939]">Sarah Johnson</p>

                  <div className="flex gap-1 mt-1">
                    {Array(5)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className="text-yellow-400 fill-yellow-400"
                          size={16}
                        />
                      ))}
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 italic leading-relaxed">
                "FreshCart has transformed my shopping experience. The quality
                of the products is outstanding, and the delivery is always on
                time. Highly recommend!"
              </p>
            </div>
          </div>
        </>
      )}
      {
       ( isResetPassword || isForgetpassword || isVerifyPassword  ) &&(<>
        <div className="flex flex-col items-center max-w-xl w-full">

      {/* IMAGE */}
      <Image
        src="/reset.png"
        alt="FreshCart"
        width={500}
        height={400}
        className="w-full mb-6"
      />

      {/* TITLE */}
      <h1 className="text-3xl font-bold text-center text-[#1E2939]">
        Reset Your Password
      </h1>

      <p className="text-[#4A5565] text-center mt-3">
        Don't worry, it happens to the best of us. We'll help you get back into your account in no time.
      </p>

     {/* FEATURES */}
            <div className="flex flex-col lg:flex-row gap-4 mt-8 text-sm text-[#6A7282]">

  <div className="flex items-center gap-2">
    <MailCheck className="text-green-500" size={18} />
    <span className="font-medium">Email Verification</span>
  </div>

  <div className="flex items-center gap-2">
    <ShieldCheck className="text-green-500" size={18} />
    <span className="font-medium">Secure Reset</span>
  </div>

  <div className="flex items-center gap-2">
    <KeyRound className="text-green-500" size={18} />
    <span className="font-medium">Encrypted</span>
  </div>

</div>

    </div>
        </>)
      }
    </div>
  );
}
