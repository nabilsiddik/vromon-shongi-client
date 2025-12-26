import Image from "next/image";
import Link from "next/link";

const Logo = ({ width, height }: { width?: number; height?: number }) => {
  return (
    <Link href={"/"}>
      <div className="flex items-center gap-3">
        <Image
          src={"/images/logo/travel-buddy-logo.png"}
          width={width ? width : 130}
          height={height ? height : 130}
          alt="logo"
        />
      </div>
    </Link>
  );
};

export default Logo;
