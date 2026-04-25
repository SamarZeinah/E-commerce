import React, { ReactNode } from "react";

type Props = {
  title: string;
  subtitle: string;
  icon: ReactNode;
 
};

export default function HeaderBanner({
  title,
  subtitle,
  icon,

}: Props) {
  return (
    <div className={`w-full py-16 px-8 text-black`}>
      <div className="flex items-center gap-4">
        <div className="bg-white/20 p-4 rounded-xl">
          {icon}
        </div>

        <div>
          <h1 className="text-3xl font-bold">{title}</h1>
          <p className="text-sm opacity-80">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}