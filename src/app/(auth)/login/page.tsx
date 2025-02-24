import { LoginForm } from "@/components/auth/LoginForm";
import { GoogleButton } from "@/components/auth/SocialButton";



export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const error = params?.error;
  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-900">
        Sign into your account
      </h1>
      {error === "OAuthAccountNotLinked" ? (
        <div className="p-x mb-4 text-red-800 rounded-lg bg-red-100 role='alert">
          <span className="font-medium">
            Account already used by other provider
          </span>
        </div>
      ) : null}

      <LoginForm />
      <div
        className="my-4 flex flex-col items-center before:flex-1 before:border:t before:border-gray-500
      after:flex-1 after:border-t after:border-gray-300"
      >
        <p className="mx-4 mb-8 text-center font-semibold to-gray-600">OR</p>
        <GoogleButton />
      </div>
    </div>
  );
}
