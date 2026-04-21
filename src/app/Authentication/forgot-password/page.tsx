'use client';
import { PasswordStepper } from '@/app/_components/PasswordStepper/PasswordStepper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axiosInstance from '@/lib/axios';
import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { useRouter } from "next/navigation";

import React, { useState } from 'react'
import toast from 'react-hot-toast';
import * as Yup from "yup";
import { ArrowLeft } from "lucide-react";



type ForgetValues = {
  email: string;
};

const page = () => {

    const router = useRouter();
 const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

  });

   const RegisterFormikOBJ = useFormik({
      initialValues: {
        email: ""
       
      },
      onSubmit: async (values: ForgetValues) => {
      console.log(values);
      try {
        const { data } = await axiosInstance.post("/auth/forgotPasswords", values);
       
        toast.success(" successfully 🎉");
        router.push("/Authentication/verify-reset-code");
        console.log(data);
        localStorage.setItem("email", values.email);
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
        <h1 className="text-3xl font-bold text-[#1E2939]">
          <span className="text-[#16A34A]" >
            Fresh
          </span>
          <span >Cart</span>

          <span className="block">Forgot Password?</span>
        </h1>

        {/* SUBTITLE */}
        <p className="text-lg text-gray-500 mt-1">
          No worries, we'll send you a reset code
        </p>

        <PasswordStepper currentStep={1} />

       
      </div>
      <form onSubmit={RegisterFormikOBJ.handleSubmit} className="space-y-4">
        {/* EMAIL */}
        <div className="flex flex-col gap-1">
          <label className="text-base font-medium text-gray-700">Email Address</label>

          <Input
            name="email"
            placeholder="Enter Your Email"
            value={RegisterFormikOBJ.values.email}
            onChange={RegisterFormikOBJ.handleChange}
            onBlur={RegisterFormikOBJ.handleBlur}
            className="h-11 text-base"
          />

          {RegisterFormikOBJ.touched.email &&
            RegisterFormikOBJ.errors.email && (
              <p className="text-red-500 text-sm">
                {RegisterFormikOBJ.errors.email}
              </p>
            )}
        </div>

       

        <Button
          type="submit"
          className="w-full h-11 text-base font-medium bg-[#16A34A] hover:bg-[#12833A] transition-colors duration-200 cursor-pointer"
        >
         Send Reset Code
        </Button>
      </form>

       <a
          href="/Authentication/login"
          className="text-green-600 font-medium hover:underline"
        >

          <ArrowLeft size={20} /> Back to Sign In
         
        </a>
      <p className="text-center text-sm text-gray-600 mt-8">
       Remember your password?{" "}
        <a
          href="/Authentication/login"
          className="text-green-600 font-medium hover:underline"
        >
          Sign In
        </a>
      </p>
    </div>
  )
}

export default page
