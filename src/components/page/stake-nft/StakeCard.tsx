const StakeCard = ({ data }: { data: any }): JSX.Element => {
  return (
    <div className="w-[475px] border-[5px] rounded-[25px] border-aqua-pink p-[20px] shrink-0 relative hover:bg-[#000033] ease-in duration-200">
      <div className="text-[40px] mb-[20px] absolute top-[15px] text-right right-[15px] whitespace-pre-line">
        {data.title}
      </div>
      <div className="flex items-end mb-[10px]">
        <img
          className="w-[282px] h-[275px]"
          src={data.imgURL}
          alt="AQUA-DApp"
        />
        <button className="button border-white border-[3px] rounded-[15px] text-[25px] px-[20px]">
          Stake
        </button>
      </div>

      <div>
        <div className="text-[25px]">{data.rankInfo}</div>
        <div className="text-[25px]">{data.rewardInfo}</div>
      </div>
    </div>
  );
};

export default StakeCard;
