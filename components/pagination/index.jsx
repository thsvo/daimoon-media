import { useCallback, useMemo, useState } from 'react';

export const Pagination = ({
  previousLabel = 'Prev',
  nextLabel = 'Next',
  pageCount,
  onPageChange,
  pageRangeDisplayed = 2,
  breakLabel = '...',
  pageLinkClassName,
  previousClassName,
  nextClassName,
  disabledClassName,
  breakClassName,
  containerClassName,
  activeClassName,
  gap = { marginRight: '4px' },
  forcePage,
}) => {
  const [currentPage, setCurrentPage] = useState(forcePage || 0);

  const handlePageClick = useCallback(
    (page) => {
      onPageChange({ selected: page });
      setCurrentPage(page);
    },
    [onPageChange]
  );

  const pages = useMemo(() => {
    const pages = [];
    const leftSide = pageRangeDisplayed / 2;
    const rightSide = pageRangeDisplayed - leftSide;

    for (let i = 0; i < pageCount; i++) {
      const label = i + 1;
      let className = pageLinkClassName;
      if (i === currentPage) className += ` ${activeClassName}`;

      if (
        i === 0 ||
        i === pageCount - 1 ||
        (i >= currentPage - leftSide && i <= currentPage + rightSide)
      ) {
        pages.push(
          <button
            key={i}
            onClick={() => handlePageClick(i)}
            className={className}
            style={gap}
          >
            {label}
          </button>
        );
      } else if (
        (i < currentPage - leftSide && i === 1) ||
        (i > currentPage + rightSide && i === pageCount - 2)
      ) {
        pages.push(
          <span key={i} className={breakClassName} style={gap}>
            {breakLabel}
          </span>
        );
      }
    }

    return pages;
  }, [
    currentPage,
    pageCount,
    pageRangeDisplayed,
    pageLinkClassName,
    activeClassName,
    breakClassName,
    breakLabel,
  ]);

  return (
    <div className={containerClassName}>
      <button
        onClick={() => handlePageClick(currentPage - 1)}
        className={
          currentPage === 0
            ? `${previousClassName} ${disabledClassName}`
            : previousClassName
        }
        disabled={currentPage === 0}
        style={gap}
      >
        {previousLabel}
      </button>

      {pages}

      <button
        onClick={() => handlePageClick(currentPage + 1)}
        className={
          currentPage === pageCount - 1
            ? `${nextClassName} ${disabledClassName}`
            : nextClassName
        }
        disabled={currentPage === pageCount - 1}
      >
        {nextLabel}
      </button>
    </div>
  );
};

export default Pagination;
