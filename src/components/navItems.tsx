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
      className="flex flex-col justify-center text-center mt-auto mb-auto font-sans text-stone-800 font-bold"
    >
      <p>{title}</p>
    </Link>
  );
}
