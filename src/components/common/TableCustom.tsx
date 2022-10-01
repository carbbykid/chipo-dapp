import PetWorking from "components/page/my-pets-working/PetWorking";

type TableCustom = {
  data: any;
  titleRow: any;
  getStakedIds?: any;
};

const TableCustom = ({ data, titleRow }: TableCustom): JSX.Element => {
  return (
    <table className="w-full bg-[#130945] border-separate border-spacing-0 pt-[23px] pb-[26px] px-[30px] bg-opacity-50">
      <thead className="text-[25px] text-center">
        <tr className="">
          {titleRow.map((col: any, idx: number) => (
            <th
              className="pb-[18px] tracking-wide border-b-[1px] border-aqua-pink"
              key={idx}
            >
              {col.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="py-[18px] text-[25px] text-center">
        {data.map((row: any, idx: number) => (
          <PetWorking
            key={`working${idx}`}
            titleRow={titleRow}
            row={row}
            idx={idx}
          />
        ))}
      </tbody>
    </table>
  );
};

export default TableCustom;
