import QuickStats from "./QuickStats";
import Logo from "./Logo";

export const Header = () => {
      return (
            <header className="flex w-full h-full justify-between p-8 pb-0">
                  <Logo />
                  <QuickStats />
            </header>
      )
}

export default Header;