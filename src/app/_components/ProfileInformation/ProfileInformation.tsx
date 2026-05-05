"use client";

import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "@/lib/axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function ProfilesForm() {
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "Samar Zeinah",
      email: "samarzeinah@gmail.com",
      phone: "01006690179",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Name must be at least 3 characters")
        .required("Full name is required"),

      phone: Yup.string()
        .matches(/^01[0-9]{9}$/, "Invalid phone number")
        .required("Phone is required"),

      email: Yup.string()
        .email("Invalid email")
        .required("Email is required"),
    }),

    onSubmit: async (values) => {
      try {
        setLoading(true);

        const { data } = await axiosInstance.put(
          "/users/updateMe/",
          values
        );

        toast.success("Profile updated successfully 🎉");

        console.log(data);
      } catch (error) {
        toast.error("Something went wrong ❌");
        console.log(error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="space-y-5">

      {/* NAME */}
      <div>
        <label className="block text-sm mb-1">Full Name</label>

        <input
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          className="w-full p-3 rounded-lg border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-sm mt-1">
            {formik.errors.name}
          </p>
        )}
      </div>

      {/* EMAIL */}
      <div>
        <label className="block text-sm mb-1">Email Address</label>

        <input
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          className="w-full p-3 rounded-lg border bg-gray-100"
        />

        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-sm mt-1">
            {formik.errors.email}
          </p>
        )}
      </div>

      {/* PHONE */}
      <div>
        <label className="block text-sm mb-1">Phone Number</label>

        <input
          name="phone"
          value={formik.values.phone}
          onChange={formik.handleChange}
          className="w-full p-3 rounded-lg border bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {formik.touched.phone && formik.errors.phone && (
          <p className="text-red-500 text-sm mt-1">
            {formik.errors.phone}
          </p>
        )}
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        disabled={loading}
        className={`px-5 py-2 rounded-lg text-white transition cursor-pointer ${
          loading
            ? "bg-green-800 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? "Updating..." : "Save Changes"}
      </button>

    </form>
  );
}