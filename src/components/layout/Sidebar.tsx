/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { FaAngleDoubleLeft } from "react-icons/fa";
import classNames from "classnames";
import { spawn } from "child_process";

const Sidebar = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [isCollapse, setIsCollapse] = useState(true);

  const router = useRouter();

  const activeMenu = useMemo(
    () => {
      for (const menu of menuItems) {
        if (menu.link === router.pathname) return menu;
        if (!menu.children || !menu.children.length) {
          continue;
        } else {
          const submenu = menu.children.find(
            (submenu) => submenu.link === router.pathname,
          );

          if (submenu) return submenu;
          continue;
        }
      }
    }, // menuItems.find((menu) => {

    //   if (!menu.children || !!menu.children?.length) {
    //     return menu.link === router.pathname;
    //   } else {
    //     return menu.children.find(
    //       (submenu) => submenu.link === router.pathname,
    //     );
    //   }
    // }),
    [router.pathname],
  );

  // console.log(activeMenu);

  const handleOnMouse = () => {
    setIsCollapse((prev) => !prev);
  };

  const getNavItemClasses = (menu: any) => {
    return classNames(
      "cursor-pointer text-aqua-pink text-[25px] rounded w-full overflow-hidden whitespace-nowrap border-[#d581ab] border-b-2",
      {
        ["text-white"]: activeMenu?.id === menu.id,
        ["text-[#828282] pointer-events-none"]: menu.disabled === true,
      },
    );
  };

  const getNavSubItemClasses = (submenu: any) => {
    return classNames(
      "cursor-pointer text-aqua-pink text-[25px] rounded w-full overflow-hidden whitespace-nowrap",
      {
        ["text-white"]: activeMenu?.id === submenu.id,
        ["text-[#828282] pointer-events-none"]: submenu.disabled === true,
      },
    );
  };

  return (
    <div
      className={`aqua-sidebar border-[#d581ab] border-t-2 border-r-2 rounded-r-[25px] relative ease-in duration-300 ${
        toggleCollapse ? "w-[8%]" : "w-[345px]"
      } `}
      // onMouseEnter={handleOnMouse}
      // onMouseLeave={handleOnMouse}
    >
      <div className="relative z-[12]">
        <div className="flex items-center justify-between">
          <Link href={"/"}>
            <a className="w-full flex items-center justify-between px-[15px] py-[15px] border-b-[2px] border-[#d581ab]">
              <img
                src="/images/logo.png"
                alt="logo"
                className="w-[100px] h-[100px]"
              />
              <span
                className={`text-[42px] leading-[50px] text-[#e87481] ml-[15px] tracking-[3px] ${
                  toggleCollapse ? "hidden" : ""
                }`}
              >
                AQUA
                <br />
                UNICORN
              </span>
            </a>
          </Link>
          {/* {isCollapse && (
          <button
            className={`absolute right-5 top-5 rounded p-4 ${
              toggleCollapse ? "rotate-180" : ""
            }`}
            onClick={() => setToggleCollapse((prev) => !prev)}
          >
            <FaAngleDoubleLeft className="w-[25px] h-[25px]" />
          </button>
        )} */}
        </div>
        <div>
          {menuItems.map((menu) => {
            const classes = getNavItemClasses(menu);
            return (
              <div key={menu.id} className={`${classes}`}>
                <Link href={menu.link}>
                  <a className="w-full h-full px-[30px] py-[17px] block hover:bg-[#000033] ease-in duration-200">
                    {menu.label}
                    {menu.note && (
                      <span className="text-[#e3d752] text-[12px] ml-[9px]">
                        {menu.note}
                      </span>
                    )}
                  </a>
                </Link>
                {!!menu.children?.length && (
                  <div className="pl-[40px]">
                    {menu.children.map((submenu, idx) => {
                      const classesSub = getNavSubItemClasses(submenu);
                      return (
                        <div key={idx} className={classesSub}>
                          <Link href={submenu.link}>
                            <a className="w-full h-full px-[30px] py-[8px] block hover:bg-[#000033]">
                              {submenu.label}
                            </a>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

const menuItems = [
  { id: 1, label: "DASHBOARD", icon: "", link: "/dashboard" },
  { id: 2, label: "MINT UNICORN", icon: "", link: "/mint-unicorn" },
  {
    id: 3,
    label: "MY PETS",
    icon: "",
    link: "/my-pets",
    children: [
      {
        id: 4.1,
        label: "IDLE",
        icon: "",
        link: "/my-pets/idle",
      },
      {
        id: 4.2,
        label: "WORKING",
        icon: "",
        link: "/my-pets/working",
      },
    ],
  },
  {
    id: 4,
    label: "MARKET PLACE",
    icon: "",
    link: "/market-place",
    note: "COMING SOON",
    disabled: true,
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
  // { id: 8, label: "TRANSFER NFT", icon: "", link: "/transfer-nft" },
];
