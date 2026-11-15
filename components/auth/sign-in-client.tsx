"use client";

import { authClient } from "@/lib/auth-client";
import SignInForm, { type SignInSubmitHandler } from "@/components/auth/sign-in-form";

// Runs in the browser — authClient must stay inside a client component.
const handleSignIn: SignInSubmitHandler = async (data) => {
  const { data: signInResponse, error } = await authClient.signIn.email({
    email: data.email,
    password: data.password,
    rememberMe: true,
    callbackURL: "/", // redirect after success
  });

  if (error) {
    console.log("Sign-in error:", error);
    // optionally return error to form
    return { error };
  }

  console.log("Sign-in success:", signInResponse);
  return { success: true };
};

const SignInClient = () => {
  return <SignInForm onSubmit={handleSignIn} />;
};

export default SignInClient;
