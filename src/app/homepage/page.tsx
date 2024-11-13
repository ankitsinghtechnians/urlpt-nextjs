

import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import React from "react";
import Signup from "@/components/Auth/Signup";
// import SignupwithPassword from "./auth/signupwithPassword";

export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Home page for NextAdmin Dashboard Kit",
};

export default function HomePage() {
  return (
    <>
        <DefaultLayout>
          <ECommerce />
        </DefaultLayout>
    </>
  );
}
