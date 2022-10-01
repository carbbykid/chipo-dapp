import Link from "next/link";
import ConnectBar from "./ConnectBar";
import SidebarMobile from "./SidebarMobile";

const Header = () => {
  return (
    <div className="flex justify-between md:justify-end items-center">
      <Link href={"/"}>
        <a className="border-[#d581ab] flex items-center md:hidden">
          <img
            src="/images/logo.png"
            alt="logo"
            className="w-[60px] h-[60px]"
          />
          <span className={`text-[#e87481] text-xl flex flex-col`}>
            <span>AQUA</span>
            <span>UNICORN</span>
          </span>
        </a>
      </Link>
      <div className="flex gap-2 items-center">
        <ConnectBar />
        <div className="block md:hidden z-50">
          <SidebarMobile />
        </div>
      </div>
    </div>
  );
};

export default Header;
