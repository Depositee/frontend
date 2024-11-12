"use client";
import React from "react";
import Link from "next/link";

interface NavItemsProps {
  path: string;
  title: string;
  className?: string;
  onClick? : () => void;
}

export default function NavItems(props : NavItemsProps) {
  return (
    props.onClick ? 
    <button onClick={props.onClick} 
      className="flex flex-col justify-center text-center mt-auto mb-auto font-sans text-stone-800 font-bold squishy-click"
    >
          {props.title}
    </button>
    : 
    <Link
      href={props.path}
      className="flex flex-col justify-center text-center mt-auto mb-auto font-sans text-stone-800 font-bold squishy-click"
    >
      <p>{props.title}</p>
    </Link>
  );
}
