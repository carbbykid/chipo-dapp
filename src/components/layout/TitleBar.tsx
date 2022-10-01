const TitleBar = ({
  title,
  element,
}: {
  title: string;
  element?: JSX.Element;
}) => {
  return (
    <div className="flex justify-between items-end">
      <div className="text-3xl md:text-5xl sm-text-[70px] mt-[35px] mb-[40px] ml-[5px]">
        {title}
      </div>
      {element}
    </div>
  );
};

export default TitleBar;
