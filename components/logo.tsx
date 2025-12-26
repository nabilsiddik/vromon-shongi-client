import Image from "next/image";
import Link from "next/link";

const Logo = ({
  width = 110,
  height = 110,
}: {
  width?: number;
  height?: number;
}) => {
  return (
    <Link href={"/"}>
      <div className="flex items-center gap-3">
        <Image
          src={"/images/logo/travel-buddy-logo.png"}
          width={width}
          height={height}
          alt="logo"
        />
      </div>
    </Link>
  );
};

export default Logo;
