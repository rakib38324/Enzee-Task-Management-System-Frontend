import ForgetPasswordClient from "@/Components/ForgetPassword/ForgetPasswordClient";
import Loading from "@/Components/Loading/Loading";
import React, { Suspense } from "react";

const ForgetPasswordPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ForgetPasswordClient />
    </Suspense>
  );
};

export default ForgetPasswordPage;
