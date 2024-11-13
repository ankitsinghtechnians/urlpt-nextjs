// "use client";
// import Link from "next/link";
// import React from "react";
// // import GoogleSigninButton from "../GoogleSigninButton";
// // import SigninWithPassword from "../SigninWithPassword";
// import SignupwithPassword from "../../../app/auth/signupwithPassword";

// export default function Signup() {
//   return (
//     <>
//      <div className="mb-50">
//         <SignupwithPassword />
//       </div>
//       {/* <GoogleSigninButton text="Sign in" /> */}

//       {/* <div className="my-6 flex items-center justify-center">
//         <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
//         <div className="block w-full min-w-fit bg-white px-3 text-center font-medium dark:bg-gray-dark">
//           Or sign in with email
//         </div>
//         <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
//       </div> */}

     

     
//     </>
//   );
// }


"use client";
import Link from "next/link";
import React from "react";
// import GoogleSigninButton from "../GoogleSigninButton";
// import SigninWithPassword from "../SigninWithPassword";
import SignupwithPassword from "../../../app/auth/signupwithPassword";
import SignIn from "@/app/auth/signin/page";

export default function Signup() {
  return (
    <>
     <div className="">
        <SignupwithPassword />
      </div>
      <div className="mt-6 text-center">
        <p>
          Already have account?{" "}
          <Link href="/auth/signin" className="text-primary">
            Sign In
          </Link>
        </p>
      </div>
      {/* <GoogleSigninButton text="Sign in" /> */}

      {/* <div className="my-6 flex items-center justify-center">
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
        <div className="block w-full min-w-fit bg-white px-3 text-center font-medium dark:bg-gray-dark">
          Or sign in with email
        </div>
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
      </div> */}

     

     
    </>
  );
}
