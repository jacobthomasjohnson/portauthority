import QuickStats from "./QuickStats";
import Logo from "./Logo";

export const Header = () => {
      return (
            <header className="header">
                  <Logo />
                  <QuickStats />
            </header>
      )
}

export default Header;