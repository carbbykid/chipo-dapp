const TitleBar = ({ busd, auni }: { busd: number; auni: number }) => {
  return (
    <div className="flex justify-end gap-[40px] text-[20px]">
      <button className="button min-w-[265px] text-right">{busd} BUSD</button>
      <button className="button min-w-[265px] text-right">{auni} AUNI</button>
      <button className="button min-w-[265px]">CONNECT WALLET</button>
    </div>
  );
};

export default TitleBar;
