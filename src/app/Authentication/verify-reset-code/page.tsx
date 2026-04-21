'use client';

import { useRouter } from 'next/navigation';
import * as Yup from "yup";
import { useFormik } from 'formik';
import axiosInstance from '@/lib/axios';
import toast from 'react-hot-toast';
import { AxiosError } from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PasswordStepper } from '@/app/_components/PasswordStepper/PasswordStepper';
import { ArrowLeft } from 'lucide-react';


type VerifyValues = {
  resetCode: string;
};

const page = () => {
  const email = localStorage.getItem("email");
    const router = useRouter();
   const validationSchema = Yup.object({
      resetCode: Yup.string()
      .matches( /^[0-9]{6}$/, "Reset code must be 6 digits")
        .required("Reset code is required"),
  
    });


      const RegisterFormikOBJ = useFormik({
      initialValues: {
        resetCode: ""
       
      },
      onSubmit: async (values: VerifyValues) => {
      console.log(values);
      try {
        const { data } = await axiosInstance.post("/auth/verifyResetCode", values);
       
        toast.success("Reset code verified successfully 🎉");
        router.push("/Authentication/reset-password");
        console.log(data);
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;

        toast.error(err.response?.data?.message || "Something went wrong ❌");
        console.log(error);
      }
    },

    validationSchema,
  });


  return (
    <div>
      <div className="text-center mb-6">
        {/* TITLE */}
        <h1 className="text-4xl font-bold text-[#1E2939]">
          <span className="block">
            Fresh<span className="text-[#16A34A]">Cart</span>
          </span>

          <span className="block">Check Your Email</span>
        </h1>

        {/* SUBTITLE */}
        <p className="text-lg text-gray-500 mt-1">
         Enter the 6-digit code sent to you
        </p>

       
      </div>
    <PasswordStepper currentStep={2} />
      <form onSubmit={RegisterFormikOBJ.handleSubmit} className="space-y-4">
        {/* EMAIL */}
        <div className="flex flex-col gap-1">
          <label className="text-base font-medium text-gray-700">Verification Code</label>

          <Input
            name="resetCode"
            placeholder="Enter Verification Code"
            value={RegisterFormikOBJ.values.resetCode}
            onChange={RegisterFormikOBJ.handleChange}
            onBlur={RegisterFormikOBJ.handleBlur}
            className="h-11 text-base"
          />

        

          {RegisterFormikOBJ.touched.resetCode &&
            RegisterFormikOBJ.errors.resetCode && (
              <p className="text-red-500 text-sm">
                {RegisterFormikOBJ.errors.resetCode}
              </p>
            )}
        </div>

       <div className='text-center text-gray-700 text-sm my-5'>
              <span>Didn't receive the code?</span>

<button
  type="button"
  onClick={async () => {
    try {
      await axiosInstance.post("/auth/forgotPasswords", {
        email: "USER_EMAIL_HERE",
      });
      toast.success("Code resent successfully 📩");
    } catch (err) {
      toast.error("Failed to resend code ❌");
    }
  }}
  className="text-green-600 font-medium hover:underline"
>
  Resend Code
</button>
       </div>

        <Button
          type="submit"
          className="w-full h-11 text-base font-medium bg-[#16A34A] hover:bg-[#12833A] transition-colors duration-200 cursor-pointer"
        >
         Verify Code
        </Button>
      </form>


        <div className='flex justify-center text-gray-700  hover:text-green-600 transition-colors duration-200 items-center  my-4 '>
          <ArrowLeft size={18} />
          <a
          href="/Authentication/forgot-password"
          
        >
         Change email address
        </a>
     
        </div>
    </div>
  )
}

export default page
