/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { FaAngleDoubleLeft } from "react-icons/fa";
import classNames from "classnames";

const Sidebar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapse, setIsCollapse] = useState(true);

  const router = useRouter();

  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.link === router.pathname),
    [router.pathname],
  );

  const handleOnMouse = () => {
    setIsCollapse((prev) => !prev);
  };

  const getNavItemClasses = (menu: any) => {
    return classNames(
      "flex items-center cursor-pointer hover:bg-light-lighter rounded w-full overflow-hidden whitespace-nowrap",
      {
        ["bg-light-lighter"]: activeMenu?.id === menu.id,
      },
    );
  };

  return (
    <div
      className={`h-screen px-4 pt-8 pb-4 bg-black border border-dashed relative ease-in duration-300 ${
        toggleCollapse ? "w-[8%]" : "w-[18%]"
      } `}
      onMouseEnter={handleOnMouse}
      onMouseLeave={handleOnMouse}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="/images/logo.png"
            alt="logo"
            className="w-[120px] h-[120px]"
          />
          <span
            className={`text-[2.5em] leading-[50px] text-[#c57370] ${
              toggleCollapse ? "hidden" : ""
            }`}
          >
            AQUA UNICORN
          </span>
        </div>
        {isCollapse && (
          <button
            className={`absolute right-5 top-5 rounded p-4 ${
              toggleCollapse ? "rotate-180" : ""
            }`}
            onClick={() => setToggleCollapse((prev) => !prev)}
          >
            <FaAngleDoubleLeft className="w-[25px] h-[25px]" />
          </button>
        )}
      </div>
      <div className="mt-24">
        {menuItems.map((menu) => {
          const classes = getNavItemClasses(menu);
          return (
            <div key={menu.id} className={classes}>
              <Link href={menu.link}>
                <a className="text-aqua-pink">{menu.label}</a>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;

const menuItems = [
  { id: 1, label: "DASHBOARD", icon: "", link: "/dashboard" },
  { id: 2, label: "MINT UNICORN", icon: "", link: "/mint-unicorn" },
  { id: 3, label: "MY PETS", icon: "", link: "/my-pets" },
  {
    id: 4,
    label: "MARKET PLACE",
    icon: "",
    link: "/market-place",
    children: [
      {
        id: 1,
        label: "IDLE",
        icon: "",
        link: "market-place/idle",
      },
      {
        id: 2,
        label: "WORKING",
        icon: "",
        link: "market-place/working",
      },
    ],
  },
  { id: 5, label: "STAKE NFT", icon: "", link: "/stake-nft" },
  {
    id: 6,
    label: "DUNGEON (PVE)",
    icon: "",
    link: "/dungeon",
    note: "COMING SOON",
    disabled: true,
  },
  {
    id: 7,
    label: "DUEL (PVP)",
    icon: "",
    link: "/duel",
    note: "COMING SOON",
    disabled: true,
  },
  { id: 8, label: "TRANSFER NFT", icon: "", link: "/transfer-nft" },
];
