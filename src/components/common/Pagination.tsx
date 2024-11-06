import React from "react";
import { MAX_PAGES_TO_SHOW } from "./constants";

interface IPagination {
  pages: number;
  page: number;
  changePage: (newPage: number) => void;
}

// Helper function to generate page numbers array for map
const getPageNumbers = (pages: number, page: number, maxPagesToShow: number) => {
  const half = Math.floor(maxPagesToShow / 2);
  let start = Math.max(1, page - half);
  let end = Math.min(pages, page + half);

  if (end - start + 1 < maxPagesToShow) {
    if (start === 1) {
      end = Math.min(pages, start + maxPagesToShow - 1);
    } else if (end === pages) {
      start = Math.max(1, end - maxPagesToShow + 1);
    }
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
};

const createButtonClasses = (
  isDisabled: boolean,
  isCurrentPage: boolean,
  isBackButton: boolean,
  isNextButton: boolean
) => {
  const baseClasses = "bg-orange-1 hover:bg-orange-2 p-3 text-white";
  const disabledClass = isDisabled ? "opacity-50 cursor-not-allowed" : "";
  const currentPageClass = isCurrentPage ? "font-bold" : "";

  const roundedClass = isBackButton ? "rounded-s" : isNextButton ? "rounded-e" : "";

  return `${baseClasses} ${disabledClass} ${currentPageClass} ${roundedClass}`.trim();
};

export const Pagination: React.FC<IPagination> = ({ pages, page, changePage }) => {
  if (pages <= 1) return null;

  const handleBack = () => page > 1 && changePage(page - 1);
  const handleNext = () => page < pages && changePage(page + 1);

  const visiblePageNumbers = getPageNumbers(pages, page, MAX_PAGES_TO_SHOW);

  return (
    <div className='flex items-center w-300px'>
      {/* Back Button */}
      <button
        className={createButtonClasses(page === 1, false, true, false)}
        onClick={handleBack}
        disabled={page === 1}
      >
        Back
      </button>

      {/* Page Buttons */}
      {visiblePageNumbers.map((pageNumber) => (
        <button
          key={pageNumber}
          className={createButtonClasses(page === pageNumber, true, false, false)}
          onClick={() => changePage(pageNumber)}
        >
          {pageNumber}
        </button>
      ))}

      {/* Next Button */}
      <button
        className={createButtonClasses(page === pages, false, false, true)}
        onClick={handleNext}
        disabled={page === pages}
      >
        Next
      </button>
    </div>
  );
};
