type TableCustom = {
  data: any;
  titleRow: any;
  getStakedIds?: any;
};

const TableCustom = ({
  data,
  titleRow,
  getStakedIds,
}: TableCustom): JSX.Element => {
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
                {typeof col.field === "string" ||
                typeof col.field === "object" ? (
                  idx === 0 ? (
                    <div className="collections_preview__listItemImageBox">
                      {row.images.map((img: any, index: number) => (
                        <img
                          key={`image_${index}`}
                          className="w-[131px] mx-auto my-0 border-[3px] rounded-[15px] border-aqua-pink"
                          src={img.path}
                          alt="aqua-nft"
                        />
                      ))}
                    </div>
                  ) : (
                    row[col.field]
                  )
                ) : (
                  col.field(row.id, row)
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
