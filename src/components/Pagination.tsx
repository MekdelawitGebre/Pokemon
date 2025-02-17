import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;  
  totalPages: number;    
  onPageChange: (page: number) => void; 
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  
  // Function to determine which page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7; 
    
    if (showEllipsis) {
      // If the current page is one of the first three pages
      if (currentPage <= 4) {
        for (let i = 1; i <= 4; i++) pages.push(i); 
        pages.push('...'); 
        pages.push(totalPages); 
      } 
      // If the current page is one of the last three pages
      else if (currentPage >= totalPages - 3) {
        pages.push(1); 
        pages.push('...'); 
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i); 
      } 
      // For pages in the middle
      else {
        pages.push(1); 
        pages.push('...'); 
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i); 
        pages.push('...'); 
        pages.push(totalPages); 
      }
    } 

    else {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    }
    
    return pages; 
  };

  return (
    <div className="flex items-center justify-center gap-2">
      {/* Previous Page Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage === 1} 
        className="p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      
      {/* Page Number Buttons */}
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' ? onPageChange(page) : null} // Change page if it's a number
          disabled={page === '...'} 
          className={`min-w-[40px] h-10 rounded-lg ${
            page === currentPage 
              ? 'bg-blue-500 dark:bg-blue-600 text-white'
              : page === '...' 
              ? 'cursor-default'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
          } transition-colors`}
        >
          {page} 
        </button>
      ))}
      
      {/* Next Page Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={currentPage === totalPages} 
        className="p-2 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}