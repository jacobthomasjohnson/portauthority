import QuickStats from "../components/QuickStats";
import Logo from "../components/Logo";
import { Request } from "../components/Request";

export const Header = () => {
      return (
            <header className="header">
                  <Logo />
                  <Request />
                  <QuickStats />
            </header>
      )
}

export default Header;