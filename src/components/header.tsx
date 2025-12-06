import Link from "next/link";

const Header = () => {
  return (
    <div className="">
      <h1 className="font-bold w-full bg-blue-200 px-3 py-4">
        <Link href={"/"} className="hover:underline">
          HubCredo
        </Link>
      </h1>
    </div>
  );
};

export default Header;
