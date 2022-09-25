import gsap from "gsap";
import Link from "next/link";
import { useEffect, useRef } from "react";

const StakeCard = ({ data }: { data: any }): JSX.Element => {
  const land1 = useRef<HTMLImageElement>(null);
  const didAnimate = useRef(false);

  useEffect(() => {
    if (didAnimate.current) return;
    didAnimate.current = true;

    gsap.to(land1.current, {
      scrollTrigger: {
        trigger: land1.current,
        toggleActions: "play none none none",
      },
      duration: 4,
      y: -20,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  }, []);

  return (
    <div className="w-[475px] border-[5px] rounded-[25px] border-aqua-pink p-[20px] shrink-0 relative hover:bg-[#000033] ease-in duration-200">
      <div className="text-[40px] mb-[20px] absolute top-[15px] text-right right-[15px] whitespace-pre-line">
        {data.title}
      </div>
      <div className="flex items-end mb-[10px]">
        <img
          ref={land1}
          className="w-[282px] h-[275px]"
          src={data.imgURL}
          alt="AQUA-DApp"
        />
        <Link href={"my-pets/idle"}>
          <a className="button border-white border-[3px] rounded-[15px] text-[25px] px-[20px]">
            Stake
          </a>
        </Link>
      </div>

      <div>
        <div className="text-[25px]">{data.rankInfo}</div>
        <div className="text-[25px]">{data.rewardInfo}</div>
      </div>
    </div>
  );
};

export default StakeCard;
