"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "@/lib/axios";
import { KeyRound, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
type ChangePasswordFormValues = {
  currentPassword: string;
  password: string;
  rePassword: string;
};
export default function ChangePasswordForm() {
  const [loading, setLoading] = useState(false);

  const [showCurrent, setShowCurrent] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
const router = useRouter();
  const formik = useFormik<ChangePasswordFormValues>({
    initialValues: {
      currentPassword: "",
      password: "",
      rePassword: "",
    },

    validationSchema: Yup.object({
      currentPassword: Yup.string().required(
        "Current password is required"
      ),

      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("New password is required"),

      rePassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Confirm password is required"),
    }),

    onSubmit: async (values) => {
      try {
        setLoading(true);

        const { data } = await axiosInstance.put(
          "/users/changeMyPassword",
          values
        );

        toast.success("Password changed successfully 🔐");
        formik.resetForm();
        console.log(data);
        localStorage.removeItem("token"); 
        router.push("/Login");
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || "Something went wrong ❌"
        );
      } finally {
        setLoading(false);
      }
    },
  });

  const inputClass =
    "w-full p-3 rounded-lg border bg-gray-50 focus:ring-2 focus:ring-orange-400 pr-10";

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="space-y-5 border rounded-2xl p-4 bg-white shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-[2px]"
    >
      {/* HEADER */}
      <div className="flex items-start gap-3">
        <div className="bg-orange-100 text-orange-600 p-2 rounded-lg">
          <KeyRound size={28} />
        </div>

        <div>
          <h2 className="text-lg font-semibold">Change Password</h2>
          <p className="text-sm text-gray-500">
            Update your account password
          </p>
        </div>
      </div>

      {/* CURRENT PASSWORD */}
      <div>
        <label className="block text-sm mb-1">Current Password</label>

        <div className="relative">
          <input
            type={showCurrent ? "text" : "password"}
            name="currentPassword"
            value={formik.values.currentPassword}
            onChange={formik.handleChange}
            placeholder="Enter current password"
            className={inputClass}
          />

          <div
            onClick={() => setShowCurrent(!showCurrent)}
            className="absolute right-3 top-3 text-gray-500 cursor-pointer"
          >
            {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
        </div>

        {formik.touched.currentPassword &&
          formik.errors.currentPassword && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.currentPassword}
            </p>
          )}
      </div>

      {/* NEW PASSWORD */}
      <div>
        <label className="block text-sm mb-1">New Password</label>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="Enter new password"
            className={inputClass}
          />

          <div
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-500 cursor-pointer"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
        </div>

        {formik.touched.password && formik.errors.password && (
          <p className="text-red-500 text-sm mt-1">
            {formik.errors.password}
          </p>
        )}
      </div>

      {/* RE PASSWORD */}
      <div>
        <label className="block text-sm mb-1">
          Confirm New Password
        </label>

        <div className="relative">
          <input
            type={showRePassword ? "text" : "password"}
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            placeholder="Confirm new password"
            className={inputClass}
          />

          <div
            onClick={() => setShowRePassword(!showRePassword)}
            className="absolute right-3 top-3 text-gray-500 cursor-pointer"
          >
            {showRePassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </div>
        </div>

        {formik.touched.rePassword &&
          formik.errors.rePassword && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.rePassword}
            </p>
          )}
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className={`px-5 py-2 rounded-lg text-white transition cursor-pointer ${
          loading
            ? "bg-orange-300 cursor-not-allowed"
            : "bg-orange-500 hover:bg-orange-600"
        }`}
      >
        {loading ? "Updating..." : "Update Password"}
      </button>
    </form>
  );
}