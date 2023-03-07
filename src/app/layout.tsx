"use client";

import GlobalStyle from "@/globalStyle";
import Navigation from "@/components/Navigation";
import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/contexts/Cart";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GlobalStyle />
      <html lang="en">
        <body>
          <SessionProvider>
            <CartProvider>
              <Navigation>{children}</Navigation>
            </CartProvider>
          </SessionProvider>
        </body>
      </html>
    </>
  );
}
