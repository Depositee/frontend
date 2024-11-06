"use client";
import React from "react";
import Link from "next/link";

export default function NavItems({
  path,
  title,
}: {
  path: string;
  title: string;
}) {
  return (
    <Link
      href={path}
      className="flex flex-col justify-center w-[120px] text-center mt-auto mb-auto font-sans text-gray-500 mr-2.5"
    >
      <p>{title}</p>
    </Link>
  );
}
