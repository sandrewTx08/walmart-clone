import { CartProvider } from "@/contexts/Cart";
import Navigation from "@/components/Navigation";
import Loading from "@/components/Loading";
import GlobalStyle from "@/globalStyle";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);
  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };
    const handleComplete = () => {
      setPageLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  return (
    <SessionProvider session={session}>
      <CartProvider>
        <GlobalStyle />
        <Navigation>
          {pageLoading ? <Loading /> : <Component {...pageProps} />}
        </Navigation>
      </CartProvider>
    </SessionProvider>
  );
}
