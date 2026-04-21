
'use client';
import { PasswordStepper } from '@/app/_components/PasswordStepper/PasswordStepper';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axiosInstance from '@/lib/axios';
import { AxiosError } from 'axios';
import { useFormik } from 'formik';
import { Eye, EyeOff } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import * as Yup from "yup";

type ResetValues = {
 
  email: string;
  password: string;
};

const page = () => {
  const router = useRouter();
  const validationSchema = Yup.object({
    email: Yup.string()
          .email("Invalid email format")
          .required("Email is required"),
    
  
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    });


    const RegisterFormikOBJ = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: async (values:ResetValues) => {
      console.log(values);
      try {
        const { data } = await axiosInstance.post("/auth/resetPassword", values);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        toast.success("logged in successfully 🎉");
        router.push("/");
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

    





  return (
    <div>
      <div className="text-center mb-6">
        {/* TITLE */}
        <h1 className="text-4xl font-bold text-[#1E2939]">
          <span className="block">
            Fresh<span className="text-[#16A34A]">Cart</span>
          </span>

          <span className="block">Create New Password</span>
        </h1>

        {/* SUBTITLE */}
        <p className="text-lg text-gray-500 mt-1">
          Your new password must be different from previous passwords
        </p>

    <PasswordStepper currentStep={3} />
        
      </div>
      <form onSubmit={RegisterFormikOBJ.handleSubmit} className="space-y-4">
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
          {/* <label className="text-base font-medium text-gray-700">
            Password
          </label> */}
          <div className="flex justify-between items-center">
            <label className="text-base font-medium text-gray-700">
              New Password
            </label>

           
          </div>

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

        <Button
          type="submit"
          className="w-full h-11 text-base font-medium bg-[#16A34A] hover:bg-[#12833A] transition-colors duration-200 cursor-pointer"
        >
          Reset Password
        </Button>
      </form>
     
    </div>
  )
}

export default page
