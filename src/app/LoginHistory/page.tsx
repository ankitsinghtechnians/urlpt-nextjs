import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
// import TableOne from "@/components/Tables/TableOne";
import TableThree from "@/components/LoginHistory/TableThree";
// import TableTwo from "@/components/Tables/TableTwo";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";

export const metadata: Metadata = {
  title: "Next.js Tables Page | NextAdmin - Next.js Dashboard Kit",
  description: "This is Next.js Tables page for NextAdmin Dashboard Kit",
};

const LoginHistory = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="LoginHistory" />

      <div className="flex flex-col gap-10">
       
        <TableThree />
      </div>
    </DefaultLayout>
  );
};

export default LoginHistory;
