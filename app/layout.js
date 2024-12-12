import "./globals.css";

import { Header } from "./sections/Header";
import { Panels } from "./sections/Panels";
import { Log } from "./sections/Log";

export const metadata = {
      title: "Ports",
      description: "",
};

export default function RootLayout({ children }) {
      return (
            <html lang="en">
                  <body>
                        <div className="page-container">
                              <div className="h-[10%]">
                                    <Header />
                              </div>
                              <div className="flex grow xl:max-h-[75%] overflow-auto">
                                    <Panels />
                              </div>
                              <div className="flex flex-row w-full min-h-[10%] max-h-[10%]">
                                    <Log />
                              </div>
                        </div>
                  </body>
            </html>
      );
}
