import { SetStateAction, useState } from "react";

const NumberInputSpinner = ({
  min,
  max,
  value,
  setValue
}: {
  min: number;
  max: number;
  value: number;
  setValue : SetStateAction<any>
}): JSX.Element => {

  const handleClickButton = (type: string) => () => {
    if (type === "increase") {
      setValue((value : number) => ++value % (max + 1));
    } else setValue((value : number) => (--value + max + 1) % (max + 1));
  };

  return (
    <div className="flex text-[40px] justify-between border-[3px] min-w-[340px] bg-[#130945] bg-opacity-50 rounded-[5px] w-fit mx-auto my-0 p-[5px] mb-[16px]">
      <button
        onClick={handleClickButton("decrease")}
        className="w-[35px] bg-white text-black rounded-[5px] disabled:opacity-25 disabled:hover:bg-white hover:bg-aqua-pink-second ease-in duration-200 "
        disabled={value === min}
      >
        -
      </button>
      <div>
        <span className="mx-[106px]">{value}</span>
      </div>
      <button
        onClick={handleClickButton("increase")}
        className="w-[35px] bg-white text-black rounded-[5px] disabled:opacity-25 disabled:hover:bg-white hover:bg-aqua-pink-second ease-in duration-200"
        disabled={value === max}
      >
        +
      </button>
    </div>
  );
};

export default NumberInputSpinner;
