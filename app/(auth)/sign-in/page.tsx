import type { Metadata } from "next";

import SignInClient from "@/components/auth/sign-in-client";

export const metadata: Metadata = {
  title: "Sign In — HireLoop",
};

const SignInPage = () => {
  return <SignInClient />;
};

export default SignInPage;
