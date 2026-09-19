import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/source-serif-4";
import "@/styles/globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StoreProvider } from "@/components/providers/StoreProvider";
import { ToastViewport } from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: {
    default: "Saleem Traders | Tiles, Sanitaryware & Fittings",
    template: "%s | Saleem Traders"
  },
  description:
    "Shop tiles, sanitaryware, kitchen fittings and bathroom accessories thoughtfully selected for Pakistani homes and projects. Request a quote or visit our showroom in Lahore."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <ToastViewport />
        </StoreProvider>
      </body>
    </html>
  );
}
