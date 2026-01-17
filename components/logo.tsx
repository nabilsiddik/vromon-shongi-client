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
        <h2 className="text-blue-500 font-bold text-3xl">Travel Mate</h2>
      </div>
    </Link>
  );
};

export default Logo;
