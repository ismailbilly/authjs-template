import { auth } from "@/auth";


export default async function Home() {
  const session = await auth()
  console.log('====================================session');
  console.log(session);
  console.log('====================================');
  return (
    <div className="max-w-screen-xl mx-auto py-6 px-4">
          <h1 className="text-2xl">Dashboard Page</h1>
          <h2>Welcome back: <span>{session?.user?.name}</span></h2>
    </div>
  );
}
