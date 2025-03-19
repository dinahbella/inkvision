import React, { useState, useEffect } from "react";
import "../styles/global.css";
import ParentComponent from "../components/ParentComponent";
import Loading from "../components/Loading";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [asideOpen, setAsideOpen] = useState(false);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    // Attach route change event listeners
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    // Cleanup event listeners
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  const handleAsideClick = () => {
    setAsideOpen(!asideOpen);
  };

  return (
    <>
      {loading ? (
        <div className="flex flex-center wh-100">
          <Loading />
          <h1 className="mt-1">Loading...</h1>
        </div>
      ) : (
        <>
          {/* <SessionProvider session={session}> */}
          <ParentComponent
            appOpen={asideOpen}
            appAsideOpen={handleAsideClick}
          />
          {/* </SessionProvider> */}

          <main>
            <div className={asideOpen ? "container" : "container active"}>
              <Component {...pageProps} />
            </div>
          </main>
        </>
      )}
    </>
  );
}

export default MyApp;
