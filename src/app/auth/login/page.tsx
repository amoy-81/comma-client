import Link from "next/link";
import GoogleLoginBotton from "../_components/GoogleLoginBotton";
import LoginForm from "../_components/loginForm";

export default function LoginPage() {
  return (
    <section className="">
      <h1 className="text-3xl font-semibold mb-6 text-gray-300 text-center">
        Sign In
      </h1>
      <LoginForm />
      <GoogleLoginBotton />
      <div className="mt-4 text-sm text-gray-500 text-center">
        <p>
          If you do not have an account?{" "}
          <Link href="/auth/register" className=" hover:underline">
            register
          </Link>
        </p>
      </div>
    </section>
  );
}
