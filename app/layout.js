import "./globals.css";

import { Header } from "./components/Header";
import { Panels } from "./components/Panels";
import { Log } from "./components/Log";

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
                              <div className="flex grow xl:max-h-[75%] overflow-auto">
                                    <Panels />
                              </div>
                              <div className="flex flex-row w-full min-h-[10%] max-h-[20%]">
                                    <Log />
                              </div>
                        </div>
                  </body>
            </html>
      );
}
