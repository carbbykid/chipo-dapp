const TitleBar = ({ title }: { title: string }) => {
  return (
    <div className="">
      <div className="text-[70px] mt-[35px] mb-[40px] ml-[5px]">{title}</div>
    </div>
  );
};

export default TitleBar;
