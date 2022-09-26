import { useEffect, useState } from "react";
import TransferPopup from "./popups/transferPopup";

const PopupCustom = ({
  data,
  type,
  onClose,
  visible,
}: {
  data: any;
  type: string;
  onClose: any;
  visible: boolean;
}): JSX.Element => {
  const [modal, setModal] = useState<JSX.Element>();

  useEffect(() => {
    switch (type) {
      case "transfer-popup":
        setModal(<TransferPopup data={data} onClose={onClose} />);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`fixed flex items-center justify-center top-0 right-0 z-[1000] bg-opacity-80 bg-[#130945] duration-200 ease-in w-screen h-screen ${
        visible ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      {modal}
    </div>
  );
};

export default PopupCustom;
