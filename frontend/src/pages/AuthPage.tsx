import { zodResolver } from "@hookform/resolvers/zod";
import { useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import {
  loginSchema,
  registerSchema,
  type LoginInput,
  type RegisterInput,
} from "@carebridge/shared";

import { useAuth } from "../contexts/AuthContext";
import { api } from "../services/api";

type AuthFormValues = {
  fullName?: string;
  email: string;
  password: string;
  role?: "PATIENT" | "DONOR" | "HOSPITAL" | "NGO" | "ADMIN";
};


export function AuthPage({ mode }: { mode: "login" | "register" }) {
  const registerMode = mode === "register";

  const navigate = useNavigate();

  const { signIn } = useAuth();

  const [error, setError] = useState("");

  const form = useForm<AuthFormValues>({
  resolver: zodResolver(
    registerMode ? registerSchema : loginSchema
  ),
});


  async function submit(values: RegisterInput | LoginInput) {
    try {
      setError("");

      const { data } = await api.post(
        `/auth/${registerMode ? "register" : "login"}`,
        values
      );

      signIn(data.token, data.user);

      switch(data.user.role){
        case "PATIENT":
          navigate("/patient");
          break;

        case "HOSPITAL":
          navigate("/hospital");
          break;

        case "DONOR":
          navigate("/donor");
          break;

        case "NGO":
          navigate("/fundraisers");
          break;

        case "ADMIN":
          navigate("/admin");
          break;

        default:
          navigate("/");
      }
    } catch (err: any) {

      setError(
        err.response?.data?.error?.message ??
        "Unable to continue. Please try again."
      );

    }
  }


  return (
    <main className="min-h-screen bg-slate-950 flex items-center justify-center px-4">

      <section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

        <h1 className="text-3xl font-bold text-slate-900">
          CareBridge AI
        </h1>


        <p className="mt-2 text-slate-600">
          {registerMode
            ? "Create your CareBridge account"
            : "Welcome back"}
        </p>


        <form
          className="mt-6 space-y-4"
          onSubmit={form.handleSubmit(submit)}
        >

          {registerMode && (
            <Field
              label="Full Name"
              error={
                form.formState.errors.fullName?.message
              }
            >
              <input
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-slate-900 focus:border-teal-500 focus:outline-none"
                type="text"
                placeholder="John Doe"
                {...form.register("fullName")}
              />
            </Field>
          )}


          <Field
            label="Email"
            error={form.formState.errors.email?.message}
          >

            <input
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900  focus:border-teal-500 focus:outline-none"
              type="email"
              placeholder="email@example.com"
              {...form.register("email")}
            />

          </Field>


          <Field
            label="Password"
            error={form.formState.errors.password?.message}
          >

            <input
              className="w-full rounded-lg border border-slate-300 text-slate-900 bg-white px-4 py-3 focus:border-teal-500 focus:outline-none"
              type="password"
              placeholder="********"
              {...form.register("password")}
            />

          </Field>


          {registerMode && (
            <Field
              label="Register As"
              error={form.formState.errors.role?.message as string}
            >
              <select
                defaultValue="PATIENT"
                {...form.register("role")}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 focus:border-teal-500 focus:outline-none"
              >
                <option value="PATIENT">
                  Patient
                </option>

                <option value="DONOR">
                  Donor
                </option>

                <option value="HOSPITAL">
                  Hospital
                </option>

                <option value="NGO">
                  NGO
                </option>
              </select>
            </Field>
          )}



          {error && (
            <p className="rounded-lg bg-red-100 p-3 text-sm text-red-700">
              {error}
            </p>
          )}


          <button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="w-full rounded-lg bg-teal-600 py-3 font-semibold text-white hover:bg-teal-700 disabled:opacity-50"
          >

            {form.formState.isSubmitting
              ? "Please wait..."
              : registerMode
                ? "Create account"
                : "Sign in"}

          </button>


        </form>


        <p className="mt-6 text-sm text-slate-600">

          {registerMode
            ? "Already registered?"
            : "New to CareBridge?"}

          {" "}

          <Link
            className="font-semibold text-teal-700"
            to={
              registerMode
                ? "/login"
                : "/register"
            }
          >

            {registerMode
              ? "Sign in"
              : "Create an account"}

          </Link>

        </p>


      </section>

    </main>
  );
}



function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: ReactNode;
}) {

  return (
    <div className="space-y-1">

      <label className="block text-sm font-medium text-slate-700">
        {label}
      </label>


      {children}


      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}

    </div>
  );
}