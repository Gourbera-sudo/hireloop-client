"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AuthShell from "@/components/auth/auth-shell";

export type SignInSubmitHandler = (
  data: { email: string; password: string; remember: boolean },
) => Promise<
  { success?: boolean; error?: { message?: string } | null | unknown } | void
>;

const GoogleIcon = () => (
  <svg aria-hidden viewBox="0 0 24 24" className="size-4" fill="currentColor">
    <path d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27 3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.08 2 2.03 6.9 2.03 12c0 4.98 3.59 10 10.17 10 5.34 0 9.28-3.66 9.28-9.07 0-2.17-.13-1.83-.13-1.83Z" />
  </svg>
);

const GithubIcon = () => (
  <svg aria-hidden viewBox="0 0 24 24" className="size-4" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const inputClasses =
  "h-10 rounded-xl border-white/10 bg-white/[0.04] text-white placeholder:text-zinc-600 focus-visible:border-indigo-500/50 focus-visible:ring-3 focus-visible:ring-indigo-500/20";

const SignInForm = ({ onSubmit }: { onSubmit?: SignInSubmitHandler }) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    setError(null);
    setSubmitting(true);
    try {
      if (onSubmit) {
        const result = await onSubmit({ email, password, remember });

        const authError = result?.error as { message?: string } | null | undefined;
        if (result && "error" in result && result.error) {
          setError(
            authError?.message ??
              "Something went wrong while signing in. Please try again.",
          );
          return;
        }

        if (result?.success) {
          // Signed in — Better Auth has set the session cookie.
          router.push("/");
          router.refresh();
          return;
        }
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthShell>
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-white">Welcome back</h1>
        <p className="mt-2 text-sm text-zinc-400">
          Sign in to continue your job search.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <Label htmlFor="email" className="text-zinc-200">
            Email
          </Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClasses}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="password" className="text-zinc-200">
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              className={`${inputClasses} pr-10`}
            />
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={() => setShowPassword((v) => !v)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-1 top-1/2 -translate-y-1/2 text-zinc-500 hover:bg-transparent hover:text-zinc-300"
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-300">
            <Checkbox
              checked={remember}
              onCheckedChange={(checked) => setRemember(checked === true)}
              aria-label="Remember me"
              className="border-white/15 bg-transparent data-checked:border-indigo-500 data-checked:bg-indigo-500"
            />
            Remember me
          </label>

          <Link href="#" className="text-sm text-indigo-400 transition-colors hover:text-indigo-300">
            Forgot password?
          </Link>
        </div>

        {error && (
          <p
            role="alert"
            className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2.5 text-sm text-red-400"
          >
            {error}
          </p>
        )}

        <Button
          type="submit"
          disabled={submitting}
          className="h-10 rounded-xl bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-400"
        >
          {submitting ? "Signing in..." : "Sign In"}
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <span className="h-px flex-1 bg-white/10" />
        <span className="text-xs text-zinc-500">or continue with</span>
        <span className="h-px flex-1 bg-white/10" />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          className="h-10 rounded-xl border-white/10 bg-transparent text-zinc-200 hover:bg-white/[0.05] hover:text-white"
        >
          <GoogleIcon /> Google
        </Button>

        <Button
          type="button"
          variant="outline"
          className="h-10 rounded-xl border-white/10 bg-transparent text-zinc-200 hover:bg-white/[0.05] hover:text-white"
        >
          <GithubIcon /> GitHub
        </Button>
      </div>

      {/* Toggle between sign in and sign up */}
      <p className="mt-6 text-center text-sm text-zinc-400">
        New to HireLoop?{" "}
        <Link
          href="/sign-up"
          className="font-medium text-indigo-400 transition-colors hover:text-indigo-300"
        >
          Create an account
        </Link>
      </p>

    </AuthShell>
  );
};

export default SignInForm;
