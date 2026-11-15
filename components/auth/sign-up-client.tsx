"use client";
import { authClient } from "@/lib/auth-client";
import SignUpForm, { type SignUpSubmitHandler } from "@/components/auth/sign-up-form";

// Runs in the browser — authClient must stay inside a client component.
const handleSignUp: SignUpSubmitHandler = async (data) => {
  const { data: signUpResponse, error } = await authClient.signUp.email({
    name: data.name,
    email: data.email,
    password: data.password,
    role: data.role, // seeker | recruiter | admin
    callbackURL: "/", // redirect after success
  });

  if (error) {
    console.error("Sign-up error:", error);
    // optionally return error to form
    return { error };
  }

  // No router needed here — the form redirects to "/" when it receives
  // { success: true }, so we just report success back to it.
  console.log("Sign-up success:", signUpResponse);
  return { success: true };
};

const SignUpClient = () => {
  return <SignUpForm onSubmit={handleSignUp} />;
};

export default SignUpClient;
