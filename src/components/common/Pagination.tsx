import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

type Pagination = {
  totalPages: number;
  maxVisibleButtons: number;
  recordsPerPage: number;
};
const Pagination = ({
  totalPages,
  maxVisibleButtons,
  recordsPerPage,
}: Pagination): JSX.Element => {
  const [pages, setPages] = useState<JSX.Element[] | null>();
  const router = useRouter();
  const currentPage = useMemo(
    () => Number(router.query.page) || 1,
    [router.query],
  );

  const isInFirstPage = (): boolean => {
    return currentPage === 1;
  };

  const isInLastPage = (): boolean => {
    if (totalPages === 0) {
      return true;
    }
    return currentPage === totalPages;
  };

  //start page
  const startPage = (): number => {
    if (currentPage === 1) {
      // When on the first page
      return 1;
    }

    // When on the last page
    if (totalPages < maxVisibleButtons) {
      return 1;
    }

    //When on the near last page and can't jump
    if (currentPage + Math.floor(maxVisibleButtons / 2) > totalPages)
      return (
        currentPage -
        Math.floor(maxVisibleButtons / 2) +
        (totalPages - (currentPage + Math.floor(maxVisibleButtons / 2)))
      );

    if (currentPage - Math.floor(maxVisibleButtons / 2) < 1) return 1;
    // When in between
    return currentPage - Math.floor(maxVisibleButtons / 2);
  };

  //end page
  const endPage = () => {
    if (totalPages < maxVisibleButtons) {
      return totalPages;
    }
    return Math.min(startPage() + maxVisibleButtons - 1, totalPages);
  };

  const onClickFirstPage = () => {
    if (currentPage === 1) return;
    return onPageChanged(1);
  };

  const onClickPreviousPage = () => {
    if (currentPage === 1) return;
    return onPageChanged(+currentPage - 1);
  };

  const onPageChanged = (e: number) => {
    router.replace({ query: { page: e, size: recordsPerPage } }, undefined, {
      scroll: false,
      shallow: true,
    });
  };

  const generatePages = () => {
    const pagesTerm = [];
    for (let i = startPage(); i <= endPage(); i++) {
      pagesTerm.push(
        <li key={i} className="pagination-item">
          <button
            onClick={() => {
              onClickPage(i);
            }}
            className={`${isPageActive(i) ? "active" : ""} rounded-button`}
          >
            {i}
          </button>
        </li>,
      );
    }
    setPages(pagesTerm);
  };

  const onClickPage = (page: number) => {
    onPageChanged(page);
  };

  const onClickLastPage = () => {
    if (currentPage === totalPages) return;
    return onPageChanged(totalPages);
  };

  const onClickNextPage = () => {
    if (currentPage === totalPages) return;
    return onPageChanged(+currentPage + 1);
  };

  const isPageActive = (page: number) => {
    return currentPage === page;
  };

  useEffect(() => {
    generatePages();
    //because props be call in generatePages function so it is new values. so It doesn't need dependency in use Effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return (
    <div className="w-[calc(100vw_-_2rem)] md:w-auto max-w-full md:max-w-[calc(100vw_-_(2rem_+_330px))] overflow-x-scroll">
      <ul className="flex md:items-center md:justify-center">
        <li className="pagination-item">
          <button
            onClick={onClickFirstPage}
            className={isInFirstPage() ? "disabled" : ""}
            disabled={isInFirstPage()}
          >
            First
          </button>
        </li>

        <li className="pagination-item">
          <button
            onClick={onClickPreviousPage}
            className={`${isInFirstPage() ? "disabled" : ""}`}
            disabled={isInFirstPage()}
          >
            «
          </button>
        </li>
        {pages}
        <li className="pagination-item">
          <button
            onClick={onClickNextPage}
            className={`${isInLastPage() ? "disabled" : ""}`}
            disabled={isInLastPage()}
          >
            »
          </button>
        </li>
        <li className="pagination-item">
          <button
            onClick={onClickLastPage}
            className={isInLastPage() ? "disabled" : ""}
            disabled={isInLastPage()}
          >
            Last
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
