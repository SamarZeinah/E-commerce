"use client";

import AddressModal from "@/app/_components/AddressModal/AddressModal";
import ChangePasswordForm from "@/app/_components/ChangePassword/ChangePassword";
import HeaderBanner from "@/app/_components/HeaderBanner";
import ProfilesForm from "@/app/_components/ProfileInformation/ProfileInformation";
import axiosInstance from "@/lib/axios";
import { MapPin, Pencil, Trash2, Plus, User, Settings } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";
import { Suspense } from "react";
export type Address = {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
};

export type AddressResponse = {
  results: number;
  status: string;
  data: Address[];
};

type AddressFormValues = {
  name: string;
  details: string;
  phone: string;
  city: string;
};

const AddressSkeleton = () => {
  return (
    <div className="border rounded-2xl p-4 animate-pulse bg-white space-y-3">
      <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      <div className="h-3 bg-gray-200 rounded w-2/3"></div>
    </div>
  );
};

const Loader = ({ text = "Loading..." }: { text?: string }) => {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <Oval
        height={60}
        width={60}
        color="#16a34a"
        secondaryColor="#bbf7d0"
        strokeWidth={3}
        ariaLabel="loading"
        visible={true}
      />
      <p className="mt-4 text-sm text-gray-500">{text}</p>
    </div>
  );
};

 function PageContent() {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
const searchParams = useSearchParams();

  const [activeTab, setActiveTab] = useState<"addresses" | "settings">(
    "addresses"
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [selectedData, setSelectedData] =
    useState<AddressFormValues | null>(null);

  const [settingsLoading, setSettingsLoading] = useState(true);


  const fetchAddresses = async () => {
    try {
      setLoading(true);
      const { data } =
        await axiosInstance.get<AddressResponse>("/addresses");
      setAddresses(data.data);
    } catch (error) {
      toast.error("Failed to fetch addresses ❌");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === "addresses") {
      fetchAddresses();
    }
  }, [activeTab]);


useEffect(() => {
  const tab = searchParams.get("tab");

  if (tab === "settings" || tab === "addresses") {
    setActiveTab(tab);
  }
}, [searchParams]);


  useEffect(() => {
    if (activeTab === "settings") {
      setSettingsLoading(true);

      const timer = setTimeout(() => {
        setSettingsLoading(false);
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [activeTab]);

  const handleTabChange = (tab: "addresses" | "settings") => {
    setActiveTab(tab);
    localStorage.setItem("activeTab", tab);
  };


  const openAddModal = () => {
    setEditingId(null);
    setSelectedData(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item: Address) => {
    setEditingId(item._id);

    setSelectedData({
      name: item.name,
      details: item.details,
      phone: item.phone,
      city: item.city,
    });

    setIsModalOpen(true);
  };


  const handleSubmit = async (values: AddressFormValues) => {
    try {
      setActionLoading(true);

      if (editingId) {
        await axiosInstance.put(`/addresses/${editingId}`, values);
        toast.success("Address updated successfully 🎉");
      } else {
        await axiosInstance.post(`/addresses`, values);
        toast.success("Address added successfully 🎉");
      }

      setIsModalOpen(false);
      await fetchAddresses();
    } catch (error) {
      toast.error("Something went wrong ❌");
      console.log(error);
    } finally {
      setActionLoading(false);
    }
  };


  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/addresses/${id}`);
      setAddresses((prev) => prev.filter((item) => item._id !== id));
      toast.success("Address deleted 🗑️");
    } catch (error) {
      toast.error("Delete failed ❌");
      console.log(error);
    }
  };


  return (
    <>
      <div className="bg-gradient-to-br from-green-600 via-green-500 to-green-400">
        <HeaderBanner
          title="My Account"
          subtitle="Manage your addresses and account settings"
          icon={<User />}
          basePath={{ label: "Profile", href: "/Store/profile" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-6">

        {/* SIDEBAR */}
        <div className="bg-white rounded-2xl border p-4 space-y-3 h-fit">
          <h2 className="text-lg font-bold text-gray-800 border-b pb-2">
            My Account
          </h2>

          <div
            onClick={() => handleTabChange("addresses")}
            className={`p-3 rounded-xl cursor-pointer ${
              activeTab === "addresses"
                ? "bg-green-50 text-green-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <MapPin className="inline" size={18} /> My Addresses
          </div>

          <div
            onClick={() => handleTabChange("settings")}
            className={`p-3 rounded-xl cursor-pointer ${
              activeTab === "settings"
                ? "bg-green-50 text-green-600"
                : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <Settings className="inline" size={18} /> Settings
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="space-y-4">

          {/* ADDRESSES */}
          {activeTab === "addresses" && (
            <>
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">My Addresses</h2>
                  <p className="text-sm text-gray-500">
                    Manage your saved delivery addresses
                  </p>
                </div>

                <button
                  onClick={openAddModal}
                  className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700"
                >
                  <Plus size={18} />
                  Add Address
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {loading ? (
                  Array.from({ length: 2 }).map((_, i) => (
                    <AddressSkeleton key={i} />
                  ))
                ) : addresses.length === 0 ? (
                  <p className="text-gray-500 col-span-2">
                    No addresses found
                  </p>
                ) : (
                  addresses.map((item) => (
                    <div
                      key={item._id}
                      className="border rounded-2xl p-4 flex justify-between items-start bg-white shadow-sm hover:shadow-md transition-all duration-300"
                    >
                      <div className="flex gap-3">
                        <div className="bg-green-100 text-green-600 p-2 rounded-lg h-fit">
                          <MapPin size={18} />
                        </div>

                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {item.name}
                          </h3>

                          <p className="text-sm text-gray-500">
                            {item.details}
                          </p>

                          <div className="flex gap-4 text-sm text-gray-500 mt-2">
                            <span>📞 {item.phone}</span>
                            <span>🏙 {item.city}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-2 bg-gray-100 rounded-lg hover:bg-blue-100 hover:text-blue-600"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          onClick={() => handleDelete(item._id)}
                          className="p-2 bg-gray-100 rounded-lg hover:bg-red-100 hover:text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {/* SETTINGS (FIXED LOADING FLOW) */}
          {activeTab === "settings" && (
            settingsLoading ? (
              <Loader text="Loading settings..." />
            ) : (
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold">Account Settings</h2>
                  <p className="text-sm text-gray-500">
                    Update your profile information and change your password
                  </p>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border space-y-5">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 text-green-600 p-2 rounded-lg">
                      <User size={35} />
                    </div>

                    <div>
                      <h2 className="text-lg font-semibold">
                        Profile Information
                      </h2>
                      <p className="text-sm text-gray-500">
                        Update your personal details
                      </p>
                    </div>
                  </div>

                  <ProfilesForm />
                </div>

                <ChangePasswordForm />
              </div>
            )
          )}
        </div>
      </div>

      <AddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedData}
        editing={!!editingId}
        actionLoading={actionLoading}
      />
    </>
  );
}
export default function Page() {
  return (
    <Suspense fallback={null}>
      <PageContent />
    </Suspense>
  );
}