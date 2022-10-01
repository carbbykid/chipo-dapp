/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const EggUnicorn = () => {
  const egg = useRef<HTMLImageElement>(null);
  const cloudAfter = useRef<HTMLImageElement>(null);
  const cloudBefore = useRef<HTMLImageElement>(null);
  const domdom = useRef<HTMLImageElement>(null);
  const domdom1 = useRef<HTMLImageElement>(null);
  const didAnimate = useRef(false);

  useEffect(() => {
    if (didAnimate.current) return;
    didAnimate.current = true;

    // const tl = gsap.timeline();

    gsap.to(egg.current, {
      scrollTrigger: {
        trigger: egg.current,
        toggleActions: "play none none none",
      },
      duration: 2,
      y: -40,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      yoyoEase: "power1.inOut",
    });

    gsap.from(cloudAfter.current, {
      scrollTrigger: {
        trigger: cloudAfter.current,
        toggleActions: "play none none none",
      },
      duration: 5,
      y: 20,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      yoyoEase: "power1.inOut",
    });

    gsap.from(cloudBefore.current, {
      scrollTrigger: {
        trigger: cloudBefore.current,
        toggleActions: "play none none none",
      },
      duration: 5,
      y: 20,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
      yoyoEase: "power1.inOut",
    });

    gsap.from([domdom.current, domdom1.current], {
      scrollTrigger: {
        trigger: domdom.current,
        toggleActions: "play none none none",
      },
      duration: 80,
      repeat: -1,
      rotate: 360,
      ease: "power1.inOut",
      yoyoEase: "power1.inOut",
    });

    gsap.from(domdom.current, {
      scrollTrigger: {
        trigger: domdom.current,
        toggleActions: "play none none none",
      },
      duration: 0.3,
      repeat: -1,
      opacity: 0,
      yoyo: true,
      ease: "power1.out",
      yoyoEase: "power1.in",
    });
  }, []);
  return (
    <div className="flex justify-center relative my-auto">
      <div className="w-full md:w-[879px] left-1/2 -translate-x-1/2 bottom-0 md:-bottom-1/2 absolute z-[6]">
        <img
          ref={domdom1}
          src="https://gokademo.s3.ap-southeast-1.amazonaws.com/images/mint-unicorn/mint-domdom.png"
          alt="aqua-dapp"
          // layout='fill'
        />
      </div>

      <div className="w-full md:w-[879px] left-1/2 -translate-x-1/2 bottom-0 md:-bottom-1/2 absolute z-[5]">
        <img
          ref={domdom}
          src="https://gokademo.s3.ap-southeast-1.amazonaws.com/images/mint-unicorn/mint-domdom.png"
          alt="aqua-dapp"
          // layout='fill'
        />
      </div>

      <div className="w-full md:w-[170%] left-1/2 -translate-x-1/2 bottom-20 md:bottom-10 absolute z-[4]">
        <img
          className="w-full"
          ref={cloudBefore}
          src="https://gokademo.s3.ap-southeast-1.amazonaws.com/images/mint-unicorn/mint-before-cloud.png"
          alt="aqua-dapp"
          // layout='fill'
        />
      </div>

      <img
        ref={egg}
        className="w-1/2 h-auto mx-a z-[3]"
        // className="w-[307px] max-w-full absolute left-0 top-4 z-[3]"
        src="https://gokademo.s3.ap-southeast-1.amazonaws.com/images/mint-unicorn/mint-egg.png"
        alt="aqua-dapp"
        // layout='fill'
      />
      <div className="w-full md:w-[150%] left-1/2 -translate-x-1/2 -bottom-10 md:-bottom-1/3 absolute z-[2]">
        <img
          ref={cloudAfter}
          //   className="w-[774px] left-1/2 -translate-x-1/2 -bottom-[10px] absolute z-[2]"
          src="https://gokademo.s3.ap-southeast-1.amazonaws.com/images/mint-unicorn/mint-after-cloud.png"
          alt="aqua-dapp"
          // layout='fill'
        />
      </div>
    </div>
  );
};

export default EggUnicorn;
