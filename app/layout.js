import "./globals.css";

import { Header } from "./components/Header";
import { Panels } from "./components/Panels";

export const metadata = {
      title: "PortAuthority",
      description: "Manage the Port Your Way",
};

export default function RootLayout({ children }) {
      return (
            <html lang="en">
                  <body>
                        <div className="flex w-full h-full flex-col overflow-hidden gap-4">
                              <div className="max-h-[10%]">
                                    <Header />
                              </div>
                              <div className="flex grow overflow-auto">
                                    <Panels />
                              </div>
                        </div>
                  </body>
            </html>
      );
}
