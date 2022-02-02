import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated: () => signIn(),
  });

  if (status === "authenticated") {
    router.push("/dashboard");
  }

  return null;
}
