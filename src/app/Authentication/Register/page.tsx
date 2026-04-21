"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axiosInstance from "@/lib/axios";
import axios, { AxiosError } from "axios";
import { useFormik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";
type SignupValues = {
  name: string;
  email: string;
  password: string;
  rePassword: string;
  phone: string;
};
const page = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),

    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("RePassword is required"),

    phone: Yup.string()
      .matches(/^01[0-2,5]{1}[0-9]{8}$/, "Invalid Egyptian phone number")
      .required("Phone is required"),
  });

  const RegisterFormikOBJ = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },

    onSubmit: async (values: SignupValues) => {
      console.log(values);
      try {
        const { data } = await axiosInstance.post("/auth/signup", values);

        toast.success("Account created successfully 🎉");
        console.log(data);
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;

        toast.error(err.response?.data?.message || "Something went wrong ❌");
        console.log(error);
      }
    },

    validationSchema,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  return (
    <div>
      <div className="text-center mb-6">
        {/* TITLE */}
        <h1 className="text-4xl font-bold text-[#1E2939]">
          Create Your Account
        </h1>

        {/* SUBTITLE */}
        <p className="text-lg text-gray-500 mt-1">
          Start your fresh journey with us today
        </p>

        {/* SOCIAL BUTTONS */}
        <div className="mt-5 flex flex-row gap-3 w-full">
          {/* GOOGLE */}
          <button className="flex-1 flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-50 transition">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
              className="w-5 h-5"
            />
            <span className="text-sm font-medium">Google</span>
          </button>

          {/* FACEBOOK */}
          <button className="flex-1 flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-50 transition">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg"
              className="w-5 h-5"
            />
            <span className="text-sm font-medium">Facebook</span>
          </button>
        </div>
      </div>
      <div className="flex items-center my-6">
        <div className="flex-1 h-px bg-gray-300"></div>

        <span className="px-4 text-sm text-gray-500">OR</span>

        <div className="flex-1 h-px bg-gray-300"></div>
      </div>
      <form onSubmit={RegisterFormikOBJ.handleSubmit} className="space-y-4">
        {/* NAME */}
        <div className="flex flex-col gap-1">
          <label className="text-base font-medium text-gray-700">
            Full Name
          </label>

          <Input
            name="name"
            placeholder="Enter Full Name"
            value={RegisterFormikOBJ.values.name}
            onChange={RegisterFormikOBJ.handleChange}
            onBlur={RegisterFormikOBJ.handleBlur}
            className="h-11 text-base"
          />

          {RegisterFormikOBJ.touched.name && RegisterFormikOBJ.errors.name && (
            <p className="text-red-500 text-sm">
              {RegisterFormikOBJ.errors.name}
            </p>
          )}
        </div>

        {/* EMAIL */}
        <div className="flex flex-col gap-1">
          <label className="text-base font-medium text-gray-700">Email</label>

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
        {/* password */}
        <div className="flex flex-col gap-1 relative">
          <label className="text-base font-medium text-gray-700">
            Password
          </label>

          <Input
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter Your Password"
            value={RegisterFormikOBJ.values.password}
            onChange={RegisterFormikOBJ.handleChange}
            onBlur={RegisterFormikOBJ.handleBlur}
            className="h-11 text-base pr-10"
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-[40px] text-gray-500"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>

          {RegisterFormikOBJ.touched.password &&
            RegisterFormikOBJ.errors.password && (
              <p className="text-red-500 text-sm">
                {RegisterFormikOBJ.errors.password}
              </p>
            )}
        </div>
        {/* RE-PASSWORD */}
        <div className="flex flex-col gap-1 relative">
          <label className="text-base font-medium text-gray-700">
            Confirm Password
          </label>

          <Input
            name="rePassword"
            type={showRePassword ? "text" : "password"}
            placeholder="Confirm Your Password"
            value={RegisterFormikOBJ.values.rePassword}
            onChange={RegisterFormikOBJ.handleChange}
            onBlur={RegisterFormikOBJ.handleBlur}
            className="h-11 text-base pr-10"
          />

          <button
            type="button"
            onClick={() => setShowRePassword(!showRePassword)}
            className="absolute right-3 top-[40px] text-gray-500"
          >
            {showRePassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>

          {RegisterFormikOBJ.touched.rePassword &&
            RegisterFormikOBJ.errors.rePassword && (
              <p className="text-red-500 text-sm">
                {RegisterFormikOBJ.errors.rePassword}
              </p>
            )}
        </div>

        {/* PHONE */}
        <div className="flex flex-col gap-1">
          <label className="text-base font-medium text-gray-700">Phone</label>

          <Input
            name="phone"
            placeholder="Enter Your Phone"
            value={RegisterFormikOBJ.values.phone}
            onChange={RegisterFormikOBJ.handleChange}
            onBlur={RegisterFormikOBJ.handleBlur}
            className="h-11 text-base"
          />

          {RegisterFormikOBJ.touched.phone &&
            RegisterFormikOBJ.errors.phone && (
              <p className="text-red-500 text-sm">
                {RegisterFormikOBJ.errors.phone}
              </p>
            )}
        </div>
        <Button
          type="submit"
          className="w-full h-11 text-base font-medium bg-[#16A34A] hover:bg-[#12833A] transition-colors duration-200 cursor-pointer"
        >
          Create My Account
        </Button>
      </form>
      <p className="text-center text-sm text-gray-600 mt-4">
        Already have an account?{" "}
        <a
          href="/Authentication/login"
          className="text-green-600 font-medium hover:underline"
        >
          Sign In
        </a>
      </p>
    </div>
  );
};

export default page;
