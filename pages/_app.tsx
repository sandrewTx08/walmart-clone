import { CartProvider } from "@/contexts/Cart";
import Navigation from "@/components/Navigation";
import GlobalStyle from "@/globalStyle";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <CartProvider>
        <GlobalStyle />
        <Navigation>
          <Component {...pageProps} />
        </Navigation>
      </CartProvider>
    </SessionProvider>
  );
}
