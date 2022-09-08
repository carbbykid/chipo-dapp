const PetCard = ({ data }: { data: any }): JSX.Element => {
  return (
    <div className="w-[320px] border-[5px] rounded-[25px] border-aqua-pink p-[20px] hover:bg-[#000033] ease-in duration-200">
      <img
        className="w-[290px] h-[290px] border-[1px] border-aqua-pink rounded-[25px]"
        src={data.imgURL}
        alt="AQUA-DApp"
      />

      <div className="my-[20px]">
        <div className="flex justify-between">
          <div className="text-[25px]">ID</div>
          <div className="text-[25px] mb-[20px]">{data.id}</div>
        </div>

        <div className="flex justify-between">
          <div className="text-[25px]">RANK</div>
          <div className="text-[25px]">{data.rank}</div>
        </div>
      </div>

      <div className="flex justify-between">
        <button className="button min-w-[124px] border-white border-[3px] rounded-[15px] text-[25px] px-[20px]">
          Stake
        </button>
        <button className="button min-w-[124px] border-white border-[3px] rounded-[15px] text-[25px] px-[20px]">
          Sell
        </button>
      </div>
    </div>
  );
};

export default PetCard;
