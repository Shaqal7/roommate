"use client";

import { useState, useCallback } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface AuthFormProps {
  isSignIn?: boolean;
}

export default function AuthForm({ isSignIn = true }: AuthFormProps) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsLoading(true);
      setError("");

      try {
        if (isSignIn) {
          // Sign in
          const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
          });

          if (result?.error) {
            setError(result.error);
            return;
          }

          router.push("/");
          router.refresh();
        } else {
          // Sign up
          const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              email,
              password,
            }),
          });

          if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || "Something went wrong");
          }

          // Sign in after successful registration
          await signIn("credentials", {
            redirect: false,
            email,
            password,
          });

          router.push("/");
          router.refresh();
        }
      } catch (error: any) {
        setError(error.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
    [email, password, name, isSignIn, router]
  );

  const handleSocialSignIn = useCallback(
    async (provider: string) => {
      setIsLoading(true);
      try {
        await signIn(provider, { callbackUrl: "/" });
      } catch (error: any) {
        setError(error.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const formContainerStyle = {
    width: "100%",
    maxWidth: "28rem",
    padding: "2rem",
    margin: "0 auto",
    backgroundColor: "white",
    borderRadius: "0.5rem",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
  };

  const headingStyle = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    textAlign: "center" as const
  };

  const subHeadingStyle = {
    marginTop: "0.5rem",
    color: "#6B7280",
    textAlign: "center" as const
  };

  const errorStyle = {
    padding: "0.75rem",
    marginBottom: "1rem",
    fontSize: "0.875rem",
    color: "#B91C1C",
    backgroundColor: "#FEE2E2",
    borderRadius: "0.375rem"
  };

  const inputContainerStyle = {
    marginBottom: "1rem"
  };

  const labelStyle = {
    display: "block",
    marginBottom: "0.5rem",
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#374151"
  };

  const inputStyle = {
    width: "100%",
    padding: "0.5rem 0.75rem",
    border: "1px solid #D1D5DB",
    borderRadius: "0.375rem",
    outline: "none"
  };

  const buttonStyle = {
    width: "100%",
    padding: "0.5rem 1rem",
    backgroundColor: "#2563EB",
    color: "white",
    borderRadius: "0.375rem",
    fontWeight: "500",
    cursor: "pointer",
    opacity: isLoading ? "0.5" : "1"
  };

  const dividerContainerStyle = {
    position: "relative" as const,
    marginTop: "1.5rem",
    marginBottom: "1.5rem"
  };

  const dividerLineStyle = {
    position: "absolute" as const,
    top: "50%",
    width: "100%",
    borderTop: "1px solid #E5E7EB"
  };

  const dividerTextStyle = {
    position: "relative" as const,
    display: "inline-block",
    padding: "0 0.5rem",
    backgroundColor: "white",
    color: "#6B7280",
    fontSize: "0.875rem"
  };

  const socialButtonsContainerStyle = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "0.75rem",
    marginBottom: "1.5rem"
  };

  const socialButtonStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0.5rem 1rem",
    border: "1px solid #D1D5DB",
    borderRadius: "0.375rem",
    backgroundColor: "white",
    color: "#374151",
    cursor: "pointer"
  };

  const linkTextStyle = {
    fontSize: "0.875rem",
    color: "#6B7280",
    textAlign: "center" as const
  };

  const linkStyle = {
    color: "#2563EB",
    fontWeight: "500",
    textDecoration: "none"
  };

  return (
    <div style={formContainerStyle}>
      <div>
        <h1 style={headingStyle}>
          {isSignIn ? "Sign In" : "Create an Account"}
        </h1>
        <p style={subHeadingStyle}>
          {isSignIn
            ? "Sign in to access your account"
            : "Sign up to get started"}
        </p>
      </div>

      {error && (
        <div style={errorStyle}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ marginTop: "1.5rem" }}>
        {!isSignIn && (
          <div style={inputContainerStyle}>
            <label
              htmlFor="name"
              style={labelStyle}
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isLoading}
              style={inputStyle}
              required
            />
          </div>
        )}

        <div style={inputContainerStyle}>
          <label
            htmlFor="email"
            style={labelStyle}
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            style={inputStyle}
            required
          />
        </div>

        <div style={inputContainerStyle}>
          <label
            htmlFor="password"
            style={labelStyle}
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            style={inputStyle}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          style={buttonStyle}
        >
          {isLoading
            ? "Loading..."
            : isSignIn
            ? "Sign In"
            : "Create Account"}
        </button>
      </form>

      <div style={dividerContainerStyle}>
        <div style={dividerLineStyle}></div>
        <div style={{ textAlign: "center" }}>
          <span style={dividerTextStyle}>
            Or continue with
          </span>
        </div>
      </div>

      <div style={socialButtonsContainerStyle}>
        <button
          type="button"
          onClick={() => handleSocialSignIn("google")}
          disabled={isLoading}
          style={socialButtonStyle}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ marginRight: "0.5rem" }}
          >
            <path d="M12.545 10.239v3.821h5.445c-.712 2.315-2.647 3.972-5.445 3.972a6.033 6.033 0 110-12.064c1.498 0 2.866.549 3.921 1.453l2.814-2.814A9.969 9.969 0 0012.545 2C7.021 2 2.543 6.477 2.543 12s4.478 10 10.002 10c8.396 0 10.249-7.85 9.426-11.748l-9.426-.013z" />
          </svg>
          Google
        </button>
        <button
          type="button"
          onClick={() => handleSocialSignIn("github")}
          disabled={isLoading}
          style={socialButtonStyle}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ marginRight: "0.5rem" }}
          >
            <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
          </svg>
          GitHub
        </button>
      </div>

      <div style={linkTextStyle}>
        {isSignIn ? (
          <p>
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/signup"
              style={linkStyle}
            >
              Sign up
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              style={linkStyle}
            >
              Sign in
            </Link>
          </p>
        )}
      </div>
    </div>
  );
}
