import type { Metadata } from "next";
/**
 * Inter carries the UI/body text on its `wght` axis. Source Serif 4 is loaded
 * from the `opsz` build so the display face also gets the optical-size axis —
 * large headings then render with the tighter, higher-contrast forms the family
 * was drawn for (`font-optical-sizing: auto` in styles/typography.css).
 */
import "@fontsource-variable/inter";
import "@fontsource-variable/source-serif-4/opsz.css";
import "@/styles/globals.css";
import "@/styles/typography.css";
import "@/styles/motion.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StoreProvider } from "@/components/providers/StoreProvider";
import { MotionProvider } from "@/components/providers/MotionProvider";
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
        {/*
          Flag the document as scriptable *before* first paint, so reveal
          targets and the hero entrance never flash visible-then-hidden.
          A plain inline <script> runs synchronously as the HTML parses —
          next/script's beforeInteractive only queues it for hydration, which
          is too late. With JS disabled it never runs, and motion.css keeps
          every reveal target visible (see the `html.js-motion` guards).
        */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js-motion');" }} />
        <StoreProvider>
          <MotionProvider />
          <Header />
          <main>{children}</main>
          <Footer />
          <ToastViewport />
        </StoreProvider>
      </body>
    </html>
  );
}
