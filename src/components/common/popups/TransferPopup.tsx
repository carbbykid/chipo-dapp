import { useState } from "react";

const TransferPopup = ({
  data,
  onClose,
}: {
  data: any;
  onClose: () => void;
}): JSX.Element => {
  const [valueForm, setValueForm] = useState({ address: "", nftId: "" });

  const handleChangeValue = (e: any) => {
    setValueForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    setTimeout(() => {
      alert("Transfer success");
      console.log("data:", data);
      onClose();
    }, 500);
  };

  return (
    <div className="bg-[#130945] duration-200 ease-in w-[935px] border-[3px] py-[98px] px-[175px] border-aqua-pink rounded-[25px] bg-opacity-50 mx-auto my-0">
      <form className="text-[25px]">
        <div className="mb-[52px] text-center">Enter address and nft id</div>
        <div>
          <input
            type="text"
            value={valueForm.address}
            name="address"
            placeholder="ADDRESS"
            onChange={handleChangeValue}
            className="w-full rounded-[15px] px-[10px] py-[5px] mb-[43px] text-[#333]"
          />
        </div>

        <div>
          <input
            type="text"
            value={valueForm.nftId}
            name="nftId"
            placeholder="NFT ID"
            onChange={handleChangeValue}
            className="w-full rounded-[15px] px-[10px] py-[5px] mb-[43px] text-[#333]"
          />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onClose}
            className="mx-auto my-0 block button min-w-[127px] border-white border-[3px] rounded-[15px] text-[25px] px-[70px]"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="mx-auto my-0 block button min-w-[127px] border-white border-[3px] rounded-[15px] text-[25px] px-[70px]"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default TransferPopup;
