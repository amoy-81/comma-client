import Link from "next/link";
import GoogleLoginBotton from "../_components/GoogleLoginBotton";
import RegisterForm from "../_components/RegisterForm";

export default function RegisterPage() {
  return (
    <section className="">
      <h1 className="text-3xl font-semibold mb-6 text-gray-300 text-center">
        Sign Up
      </h1>
      <RegisterForm />
      <GoogleLoginBotton />
      <div className="mt-4 text-sm text-gray-500 text-center">
        <p>
          Already have an account?{" "}
          <Link href="/auth/login" className=" hover:underline">
            signin
          </Link>
        </p>
      </div>
    </section>
  );
}
