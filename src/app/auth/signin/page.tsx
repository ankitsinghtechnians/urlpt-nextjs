// src/app/auth/signin/page.tsx

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import { Metadata } from "next";
import Signin from "@/components/Auth/Signin"; // Ensure the import path is correct
import GoogleSigninButton from "@/components/Auth/Signin/GoogleSigninButton";

export const metadata: Metadata = {
  title: "Next.js Login Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Login Page NextAdmin Dashboard Kit",
};

const SignIn: React.FC = () => {
  return (
    <div>
      <Breadcrumb pageName="Sign In" />
      <div className="rounded-[10px] bg-white shadow-1 w-10/12 left-0 right-0 mx-auto">
        <div className="flex flex-wrap items-center">
          <div className="hidden w-full  xl:block xl:w-1/2">
            <div className=" custom-gradient-1 overflow-hidden px-12.5 pt-12.5 ">
              {/* <Link className="mb-10 inline-block" href="/">
                <Image
                  className="hidden dark:block"
                  src={"/images/logo/logo.svg"}
                  alt="Logo"
                  width={176}
                  height={32}
                />
                <Image
                  className="dark:hidden"
                  src={"/images/logo/logo-dark.svg"}
                  alt="Logo"
                  width={176}
                  height={32}
                />
              </Link> */}
              {/* <p className="mb-3 text-xl font-medium text-dark dark:text-white">
                Sign in to your account
              </p> */}
              <h1 className="mb-4 mt-0 ml-9 text-2xl font-bold text-dark dark:text-white sm:text-heading-3 ">
                Welcome Back!
              </h1>
              {/* <p className="w-full max-w-[375px] font-medium text-dark-4 dark:text-dark-6">
                Please sign in to your account by completing the necessary
                fields below
              </p> */}
              <p className="w-full ml-9 max-w-[375px] font-medium text-dark dark:text-white mb-5">
                {/* To keep connected with us please login with your personal
                informatiom by username and password. */}
                Please login with your personal information
              </p>
              {/* <div className="mt-31">
                <Image
                  src={"/images/grids/grid-02.svg"}
                  alt="Logo"
                  width={405}
                  height={325}
                  className="mx-auto dark:opacity-30"
                />
              </div> */}
              <video
                width="86%"
                height="40%"
                autoPlay
                muted
                loop
                className="mb-10 ml-9 rounded-[10px]"
              >
                <source src="/images/logingif1.mp4" type="video/mp4" />
                <track
                  src="/path/to/captions.vtt"
                  kind="subtitles"
                  srcLang="en"
                  label="English"
                />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          <div className="w-full xl:w-1/2">
            <div className="w-full p-4 sm:p-10.5 xl:p-13">
              <Signin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
