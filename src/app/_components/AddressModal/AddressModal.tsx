"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";

export type FormState = {
  name: string;
  details: string;
  phone: string;
  city: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (form: FormState) => void;
  initialData?: FormState | null;
  editing?: boolean;
  actionLoading?: boolean;
};

export default function AddressModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  editing,
  actionLoading,
}: Props) {
  const formik = useFormik<FormState>({
    enableReinitialize: true,

    initialValues: {
      name: "",
      details: "",
      phone: "",
      city: "",
    },

    onSubmit: (values) => {
      onSubmit(values);
    },
  });
  useEffect(() => {
    if (initialData) {
      formik.setValues(initialData);
    } else {
      formik.resetForm();
    }
  }, [initialData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white w-full max-w-lg rounded-2xl p-6 space-y-4"
      >
        <h2 className="text-xl font-bold">
          {editing ? "Update Address" : "Add New Address"}
        </h2>

        {/* NAME */}
        <div>
          <label className="text-sm text-gray-800">Address Name</label>
          <input
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="w-full border p-2 rounded-lg"
            placeholder="e.g. Home, Office"
          />
        </div>

        {/* DETAILS */}
        <div>
          <label className="text-sm text-gray-800">Full Address</label>
          <input
            name="details"
            onChange={formik.handleChange}
            value={formik.values.details}
            className="w-full border p-2 rounded-lg"
            placeholder="Street, Building, apartment"
          />
        </div>

        {/* PHONE */}
        <div>
          <label className="text-sm text-gray-800">Phone Number</label>
          <input
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
            className="w-full border p-2 rounded-lg"
            placeholder="010xxxxxxxxx"
          />
        </div>

        {/* CITY */}
        <div>
          <label className="text-sm text-gray-800">City</label>
          <input
            name="city"
            onChange={formik.handleChange}
            value={formik.values.city}
            className="w-full border p-2 rounded-lg"
            placeholder="Cairo"
          />
        </div>

        {/* ACTIONS */}
        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={actionLoading}
            className={`px-4 py-2 rounded-lg text-white cursor-pointer transition ${
              actionLoading
                ? "bg-green-800 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            }`}
          >
            {actionLoading
              ? editing
                ? "Updating..."
                : "Adding..."
              : editing
                ? "Update"
                : "Add Address"}
          </button>
        </div>
      </form>
    </div>
  );
}
