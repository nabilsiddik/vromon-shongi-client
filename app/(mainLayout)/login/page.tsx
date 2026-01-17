import { LoginForm } from "@/components/forms/LoginForm"

export default async function LoginPage({ searchParams }: { searchParams?: Promise<{ redirect?: string }> }) {

  const params = await searchParams

  return (
    <div className="bg-gray-100 py-20 px-5">
      <div className="w-full max-w-lg mx-auto bg-white p-10 rounded-lg shadow-lg">
        <div className="mb-6 text-center">
          <h2 className="font-bold text-3xl text-center mb-2">Please Sign in</h2>
          <p>You need to Sign in first to continue</p>
        </div>
        <LoginForm redirect={params?.redirect} />
      </div>
    </div>
  )
}