import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function LoginLayout({ children }) {
  const { data: session, status } = useSession(); // Get session and status
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="full-h flex flex-center">
        <div className="loading-bar">Loading...</div>
      </div>
    );
  }

  if (!session) {
    // Redirect to sign-in page if the user is not authenticated
    router.push("/auth/signup");
    return null; // Return null to prevent rendering anything else
  }

  // If the user is authenticated, render the children
  return <>{children}</>;
}
