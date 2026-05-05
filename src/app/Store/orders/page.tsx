import HeaderBanner from '@/app/_components/HeaderBanner'
import {  SquareRoundCorner } from 'lucide-react'


export default function page() {
  return (
    <>
     <div className="bg-gradient-to-br from-green-600 via-green-500 to-green-400">
    <HeaderBanner
    title="My Orders"
    subtitle="Track and manage your 1 order"
    icon={    <SquareRoundCorner />
}
    basePath={{ label: "My Orders", href: "/Store/orders" }}
    // cartName="Checkout"
  />
</div>
    
    
    </>
  )
}
