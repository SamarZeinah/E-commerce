
"use client";

import React, { ReactNode } from "react";
import Link from "next/link";

type Props = {
  title: string;
  subtitle: string;
  icon: ReactNode;
  brandName?: string;
  // أضفي دول
  categoryName?: string;
  basePath?: { label: string; href: string };
};

export default function HeaderBanner({
  title,
  subtitle,
  icon,
  brandName,
  categoryName,
  basePath,
}: Props) {
  return (
    <div className="max-w-7xl mx-auto py-16 px-8 text-white">

      {/* BREADCRUMB */}
      <div className="text-sm mb-4 flex items-center gap-2">
        <Link href="/" className="opacity-70 hover:opacity-100">
          Home
        </Link>

        <span>/</span>

        {/* لو في basePath مخصص استخدمه، غيره الـ default */}
        <Link
          href={basePath?.href ?? "/Store/brands"}
          className="opacity-70 hover:opacity-100"
        >
          {basePath?.label ?? "Brands"}
        </Link>

        {/* Brands page */}
        {brandName && (
          <>
            <span>/</span>
            <span className="font-semibold">{brandName}</span>
          </>
        )}

        {/* Categories page */}
        {categoryName && (
          <>
            <span>/</span>
            <span className="font-semibold">{categoryName}</span>
          </>
        )}
      </div>

      {/* HEADER */}
      <div className="flex items-center gap-4">
        <div className="bg-white/20 p-6 rounded-xl">{icon}</div>
        <div>
          <h1 className="text-4xl font-bold mb-1">{title}</h1>
          <p className="text-md opacity-80">{subtitle}</p>
        </div>
      </div>
    </div>
  );
}