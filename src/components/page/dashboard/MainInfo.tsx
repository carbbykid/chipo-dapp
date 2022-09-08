const MainInfo = ({
  title,
  value,
}: {
  title: string;
  value: string;
}): JSX.Element => {
  return (
    <div className="w-[420px] border-[5px] rounded-[25px] border-aqua-pink p-[20px] shrink-0">
      <div className="text-center text-[28px] mb-[20px]">{title}</div>
      <div className="text-center text-[56px] mb-[60px]">{value}</div>
    </div>
  );
};

export default MainInfo;
