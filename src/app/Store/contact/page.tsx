import HeaderBanner from '@/app/_components/HeaderBanner';
import { Headset } from 'lucide-react';
import React from 'react'
import { Oval } from 'react-loader-spinner';

export default function page() {

     const Loader = () => {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Oval
          height={60}
          width={60}
          color="#16A34A"
          secondaryColor="#4ADE80"
          strokeWidth={3}
          ariaLabel="oval-loading"
          visible={true}
        />

        <p className="mt-4 text-sm text-gray-500">Loading Your Cart...</p>
      </div>
    );
  };
  return (
    <>
 <div className="bg-gradient-to-br from-green-600 via-green-500 to-green-400">
            <HeaderBanner
              title="Contact Us"
              subtitle="We'd love to hear from you. Get in touch with our team."
              icon={<Headset />}
              
            
               basePath={{ label: "Contact", href: "/Store/contact" }}
            />
          </div>
    
    </>
  )
}
