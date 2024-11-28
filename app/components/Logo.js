import Image from "next/image";
import Link from "next/link";

export const Logo = () => {
      return (
            <div>
                  <Link href="/">
                        <Image
                              src="/logo.svg"
                              height={33}
                              width={160}
                              alt="PortAuthority Logo"
                        />
                  </Link>
            </div>
      );
};

export default Logo;
