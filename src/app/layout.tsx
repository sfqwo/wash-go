import {Header} from "@/components/Layout/Header";
import {Footer} from "@/components/Layout/Footer";
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
      </body>
    </html>
  );
}
