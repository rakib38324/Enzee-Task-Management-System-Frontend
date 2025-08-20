
import EmailVerificationClient from "@/Components/EmailVerification/EmailVerificationClient";
import Loading from "@/Components/Loading/Loading";
import React, { Suspense } from "react";

const EmailVerification = () => {
  return (
    <Suspense fallback={<Loading />}>
      <EmailVerificationClient />
    </Suspense>
  );
};

export default EmailVerification;
