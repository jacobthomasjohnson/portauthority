import QuickStats from "../components/QuickStats";
import Logo from "../components/Logo";
import { Request } from "../components/Request";

export const Header = () => {
      return (
            <header className="header">
                  <div className="w-1/3">
                        <Logo />
                  </div>
                  <div className="w-1/3 flex justify-center">
                        <Request />
                  </div>
                  <div className="w-1/3">
                        <QuickStats />
                  </div>
            </header>
      );
};

export default Header;
