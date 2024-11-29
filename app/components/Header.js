import QuickStats from "./QuickStats";
import Logo from "./Logo";
import { Request } from "./Request";

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