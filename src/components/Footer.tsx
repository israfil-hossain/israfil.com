"use client";
import React from "react";
import { SITE_NAME, SITE_URL } from "@/lib/seo";

export const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="p-4 text-center justify-center text-xs text-neutral-500 border-t border-neutral-100 lg:pb-0 pb-10" itemScope itemType="https://schema.org/WPFooter">
      <span className="font-semibold">{year} </span>
      &mdash; Built by <span itemProp="author">{SITE_NAME}</span>
    </footer>
  );
};
