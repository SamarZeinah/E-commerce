// "use client";
// import { useEffect, useState } from "react";
// import { ArrowRight } from "lucide-react";
// import axiosInstance from "@/lib/axios";
// import { usePathname } from "next/navigation";

// type Category = {
//   _id: string;
//   name: string;
//   image: string;
// };

// //  Skeleton Component
// const CategoriesSkeleton = () => {
//   return (
//     <div className="px-4 md:px-10 py-10 max-w-7xl mx-auto p-4">
//       {/* Header skeleton */}
//       <div className="flex justify-between items-center mb-6">
//         <div className="h-6 w-40 bg-gray-300 rounded animate-pulse"></div>
//         <div className="h-4 w-32 bg-gray-300 rounded animate-pulse"></div>
//       </div>

//       {/* Grid skeleton */}
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-6">
//         {[...Array(10)].map((_, i) => (
//           <div key={i} className="flex flex-col items-center">
//             <div className="flex flex-col items-center">
//               <div className="w-40 h-40 bg-gray-200 rounded-xl flex flex-col items-center justify-center animate-pulse">
//                 <div className="w-20 h-20 rounded-full bg-gray-300"></div>
//                 <div className="h-3 w-20 bg-gray-300 rounded mt-3"></div>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const CategoriesSection = () => {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [loading, setLoading] = useState(true);
//    const pathname = usePathname(); // ← أضفي ده

//   // الـ routes اللي مش عايزة تعرض فيها الـ header
//   const hideHeaderRoutes = ["/Store/categories"];
//   const shouldHideHeader = hideHeaderRoutes.includes(pathname);

//   useEffect(() => {
//     const getCategories = async () => {
//       try {
//         const res = await axiosInstance.get("/categories");
//         setCategories(res.data.data);
//       } catch (error) {
//         console.log(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getCategories();
//   }, []);

//   if (loading) return <CategoriesSkeleton />;

//   return (
//     <div className="px-4 md:px-10 pt-20 max-w-7xl mx-auto p-4">
//       {/*  Header */}
//       { !shouldHideHeader &&(<div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
//             <div className="flex items-center gap-3">
//               <div className="w-[5px] h-8 bg-[#009966] rounded"></div>
    
   

//           <h2 className="text-2xl md:text-3xl font-bold">
//             Shop By <span className="text-[#009966]">Category</span>
//           </h2>
//         </div>

//         <button className="group flex items-center gap-2 text-[#009966] font-medium transition-transform duration-300 hover:translate-x-2">
//           View All Categories
//           <ArrowRight />
//         </button>
//       </div>
// )}
//       {/*  Categories Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 ">
//         {categories.map((cat) => (
//           <div
//             key={cat._id}
//             className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 text-center cursor-pointer flex flex-col items-center"
//           >
//             <img
//               src={cat.image}
//               alt={cat.name}
//               className="w-24 h-24 object-cover rounded-full mb-3"
//             />
//             <h3 className="text-sm font-medium">{cat.name}</h3>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoriesSection;


"use client";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import axiosInstance from "@/lib/axios";
import { usePathname } from "next/navigation";

type Category = {
  _id: string;
  name: string;
  image: string;
};

const CategoriesSkeleton = ({ isCategoriesPage }: { isCategoriesPage: boolean }) => {
  return (
    <div className="px-4 md:px-10 py-10 max-w-7xl mx-auto p-4">
      {!isCategoriesPage && (
        <div className="flex justify-between items-center mb-6">
          <div className="h-6 w-40 bg-gray-300 rounded animate-pulse"></div>
          <div className="h-4 w-32 bg-gray-300 rounded animate-pulse"></div>
        </div>
      )}

      <div className={`grid gap-6 ${
        isCategoriesPage
          ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          : "grid-cols-2 sm:grid-cols-3 md:grid-cols-6"
      }`}>
        {[...Array(10)].map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            {isCategoriesPage ? (
              <div className="w-full h-48 bg-gray-200 rounded-xl animate-pulse" />
            ) : (
              <div className="w-40 h-40 bg-gray-200 rounded-xl flex flex-col items-center justify-center animate-pulse">
                <div className="w-20 h-20 rounded-full bg-gray-300"></div>
                <div className="h-3 w-20 bg-gray-300 rounded mt-3"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const CategoriesSection = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  const hideHeaderRoutes = ["/Store/categories"];
  const isCategoriesPage = hideHeaderRoutes.includes(pathname);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axiosInstance.get("/categories");
        setCategories(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getCategories();
  }, []);

  if (loading) return <CategoriesSkeleton isCategoriesPage={isCategoriesPage} />;

  return (
    <div className="px-4 md:px-10 pt-20 max-w-7xl mx-auto p-4">

      {/* Header — بيظهر بس في الهوم */}
      {!isCategoriesPage && (
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-[5px] h-8 bg-[#009966] rounded"></div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Shop By <span className="text-[#009966]">Category</span>
            </h2>
          </div>
          <button className="group flex items-center gap-2 text-[#009966] font-medium transition-transform duration-300 hover:translate-x-2">
            View All Categories
            <ArrowRight />
          </button>
        </div>
      )}

      {/* Categories Grid */}
      <div className={`grid gap-6 ${
        isCategoriesPage
          ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          : "grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6"
      }`}>
        {categories.map((cat) =>
          isCategoriesPage ? (
            // ── Card كبيرة لصفحة /Store/categories ──
            <div
              key={cat._id}
              className="group bg-white rounded-xl shadow hover:shadow-lg transition cursor-pointer overflow-hidden relative"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-48 object-cover"
              />

              {/* Overlay عند الـ hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />

              {/* اسم + زرار */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-white transition">
                <h3 className="text-sm font-semibold text-gray-800 group-hover:text-[#009966] transition">
                  {cat.name}
                </h3>
                
                <a
                  href={`/Store/categories/${cat._id}`}
                  className="hidden group-hover:flex items-center gap-1 text-xs text-[#009966] mt-1"
                >
                  View Subcategories <ArrowRight size={12} />
                </a>
              </div>
            </div>

          ) : (
            // ── Card صغيرة للـ Home ──
            <div
              key={cat._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 text-center cursor-pointer flex flex-col items-center"
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="w-24 h-24 object-cover rounded-full mb-3"
              />
              <h3 className="text-sm font-medium">{cat.name}</h3>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default CategoriesSection;