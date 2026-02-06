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
      <div className="">
        <Image src={'/images/logo/vromon-shongi-website-logo.png'} width={250} height={100} alt="Logo"/>
      </div>
    </Link>
  );
};

export default Logo;
