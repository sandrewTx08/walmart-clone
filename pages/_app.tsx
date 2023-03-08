import { CartProvider } from "@/contexts/Cart";
import Navigation from "@/components/Navigation";
import GlobalStyle from "@/globalStyle";
import { SessionProvider } from "next-auth/react";
import { ApolloProvider } from "@apollo/client/react";
import apolloClient from "@/utils/apolloClient";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <ApolloProvider client={apolloClient}>
        <CartProvider>
          <GlobalStyle />
          <Navigation>
            <Component {...pageProps} />
          </Navigation>
        </CartProvider>
      </ApolloProvider>
    </SessionProvider>
  );
}
