import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LoginLayout({ children }) {
  const { data: session, status } = useSession(); // Get session and status
  const router = useRouter();

  // Show loading indicator while session is being fetched
  if (status === "loading") {
    return (
      <div className="full-h flex flex-center">
        <div className="loading-bar">Loading...</div>
      </div>
    );
  }

  // Redirect to sign-in page if the user is not authenticated
  useEffect(() => {
    if (!session) {
      router.push("/api/auth/signin");
    }
  }, [session, router]);

  // If the user is not authenticated, return null to prevent rendering
  if (!session) {
    return null;
  }

  // If the user is authenticated, render the children
  return children;
}
