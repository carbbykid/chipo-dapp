type TableCustom = {
  data: any;
  titleRow: any;
};

const TableCustom = ({ data, titleRow }: TableCustom): JSX.Element => {
  return (
    <table className="w-full bg-[#130945] border-separate border-spacing-0 border-[3px] pt-[23px] pb-[26px] px-[30px] border-aqua-pink rounded-[15px] bg-opacity-50">
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
          <tr key={idx} className="">
            {titleRow.map((col: any, idx: number) => (
              <td
                className={`pt-[32px] min-w-[110px] whitespace-pre-line`}
                key={idx}
              >
                {typeof col.field === "string" ? (
                  /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(row[col.field]) ? (
                    <img
                      className="w-[131px] mx-auto my-0 border-[3px] rounded-[15px] border-aqua-pink"
                      src={row[col.field]}
                      alt="aqua-nft"
                    />
                  ) : (
                    row[col.field]
                  )
                ) : (
                  col.field(idx, row)
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableCustom;
