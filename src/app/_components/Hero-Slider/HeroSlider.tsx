"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    img: "/slider.png",
    title: "Fresh Products Delivered to your Door",
    desc: "Get 20% off your first order",
    btn1: "Shop Now",
    btn2: "View Details",
  },
  {
    img: "/slider.png",
    title: "Premium Quality Guaranteed",
    desc: "Fresh from farm to Your table",
    btn1: "Shop Now",
    btn2: "Learn More",
  },
  {
    img: "/slider.png",
    title: "Fast & Free Delivery",
    desc: "same day delivery available",
    btn1: "Order Now",
    btn2: "Delivery Info",
  },
];

export default function HeroSlider() {
  return (
    <div className="w-full relative">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 3000 }}
        pagination={{ clickable: true }}
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        loop={true}
        className="w-full h-[400px] md:h-[500px]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
              {/* image */}
              <img src={slide.img} className="w-full h-full object-cover" />

              {/* gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#00C950E5] to-[#05DF7280]" />

              {/* content */}
              <div className="absolute inset-0 flex items-center  max-w-7xl mx-auto px-4">
                <div className="text-white max-w-lg space-y-4">
                  <h1 className="text-2xl md:text-4xl font-bold leading-snug">
                    {slide.title}
                  </h1>

                  <p className="text-sm md:text-base text-white/90">
                    {slide.desc}
                  </p>

                  <div className="flex gap-3 pt-2">
                    <div className="flex items-center gap-4 mt-3">
                      <button
                        className="bg-white text-[#00C950] px-6 py-2 rounded-md font-medium 
                        hover:scale-105 transition cursor-pointer"
                      >
                        {slide.btn1}
                      </button>

                      <button
                        className="border border-white text-white px-6 py-2 rounded-md 
                        hover:bg-white hover:text-[#00C950] transition cursor-pointer"
                      >
                        {slide.btn2}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* arrows */}
      <div
        className="custom-prev hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 
w-10 h-10 bg-white/80 hover:bg-white rounded-full items-center justify-center shadow 
cursor-pointer text-[#00C950] transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft size={25} />
      </div>

      <div
        className="custom-next hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 
w-10 h-10 bg-white/80 hover:bg-white rounded-full items-center justify-center shadow 
cursor-pointer text-[#00C950] transition-all duration-300 hover:scale-110"
      >
        <ChevronRight size={25} />
      </div>
    </div>
  );
}
