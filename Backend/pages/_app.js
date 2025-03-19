import React from "react";
import { useState, useEffect } from "react";
import "../styles/global.css";
import ParentComponent from "../components/ParentComponent";
import Loading from "../components/Loading";
import { useRouter } from "next/router";
import { SessionProvider } from "next-auth/react";
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    // check if route is already complete when starting
    if (router.isReady) {
      setLoading(false);
    }
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router.isReady]);
  const [asideOpen, setAsideOpen] = useState(false);

  const handleAsideClick = () => {
    setAsideOpen(!asideOpen);
  };

  return (
    <>
      {loading ? (
        <div className="flex flex-collectMeta flex-center wh-100">
          <Loading />
          <h1 className="mt-1">Loading...</h1>
        </div>
      ) : (
        <>
          <SessionProvider session={session}>
            <ParentComponent
              appOpen={asideOpen}
              appAsideOpen={handleAsideClick}
            />
            <main>
              <div className={asideOpen ? "container" : "container active"}>
                <Component {...pageProps} />
              </div>
            </main>
          </SessionProvider>
        </>
      )}
      <ParentComponent appOpen={asideOpen} appAsideOpen={handleAsideClick} />
      <main>
        <div className={asideOpen ? "container" : "container active"}>
          <Component {...pageProps} />
        </div>
      </main>
    </>
  );
}

export default MyApp;
