import Loading from "@/Components/Loading/Loading";
import ResetPasswordClient from "@/Components/ResetPassword/ResetPasswordClient";
import React, { Suspense } from "react";

const ResetPassword = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ResetPasswordClient />
    </Suspense>
  );
};

export default ResetPassword;
