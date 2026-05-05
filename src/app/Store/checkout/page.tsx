"use client"
import React, { use } from 'react'
import HeaderBanner from "@/app/_components/HeaderBanner";
import { ArrowLeft, Receipt } from 'lucide-react';
import Link from 'next/link';


export default function page() {
     
  return (
    <>

     <div className="bg-gradient-to-br from-green-600 via-green-500 to-green-400">
    <HeaderBanner
    title="Complete Your Order"
    subtitle="Review your items and complete your purchase"
    icon={<Receipt />}
    basePath={{ label: "Cart", href: "/Store/cart" }}
    cartName="Checkout"
  />
</div>
    
    
     checkout page</>
  )
}
