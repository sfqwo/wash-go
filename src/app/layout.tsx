import { Footer } from "@/components/Layout/Footer";
import { Header } from "@/components/Layout/Header";
import { Notifier } from "@/components/Notifier/Notifier";

import "./globals.css";

export const metadata = {
  title: "LaundryPro",
  description: "Сайт прачечной",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <Notifier />
      </body>
    </html>
  );
}
