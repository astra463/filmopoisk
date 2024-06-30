'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

interface PaginationProps {
  total_pages: number;
}

const Pagination: React.FC<PaginationProps> = ({ total_pages }) => {
  const router = useRouter();

  const handleClick = (page: number) => {
    router.push(`/page/${page}`);
  };

  return (
    <div className="pagination">
      {Array.from({ length: total_pages }, (_, index) => (
        <button
          onClick={() => handleClick(index + 1)}
          key={index}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
