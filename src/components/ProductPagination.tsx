
import React from "react";
import { useRTL } from "@/contexts/RTLContext";
import { cn } from "@/lib/utils";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ProductPagination: React.FC<ProductPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const { isRTL } = useRTL();

  // Generate an array of page numbers to display (mobile-friendly)
  const getPageNumbers = () => {
    const pages = [];
    const isMobile = window.innerWidth < 768;
    const maxPagesToShow = isMobile ? 3 : 5; // Show fewer pages on mobile
    
    if (totalPages <= maxPagesToShow) {
      // Show all pages if total is less than or equal to maxPagesToShow
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (isMobile) {
        // Mobile: Show only current page and maybe one on each side
        const start = Math.max(1, currentPage - 1);
        const end = Math.min(totalPages, currentPage + 1);
        
        for (let i = start; i <= end; i++) {
          pages.push(i);
        }
      } else {
        // Desktop: Original logic
        pages.push(1);
        
        let start = Math.max(2, currentPage - 1);
        let end = Math.min(totalPages - 1, currentPage + 1);
        
        if (start === 2) end = Math.min(totalPages - 1, start + 2);
        if (end === totalPages - 1) start = Math.max(2, end - 2);
        
        if (start > 2) {
          pages.push(-1); // -1 represents ellipsis
        }
        
        for (let i = start; i <= end; i++) {
          pages.push(i);
        }
        
        if (end < totalPages - 1) {
          pages.push(-2); // -2 represents ellipsis
        }
        
        if (totalPages > 1) {
          pages.push(totalPages);
        }
      }
    }
    
    return pages;
  };

  return (
    <Pagination className="my-6">
      <PaginationContent className={cn(isRTL && "flex-row-reverse", "flex-wrap justify-center")}>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            className={cn(
              currentPage === 1 && "pointer-events-none opacity-50",
              "cursor-pointer text-sm"
            )}
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>

        {getPageNumbers().map((page, index) => (
          <PaginationItem key={index} className="hidden sm:block">
            {page < 0 ? (
              <span className="px-2 text-sm">...</span>
            ) : (
              <PaginationLink
                onClick={() => onPageChange(page)}
                isActive={page === currentPage}
                className="cursor-pointer text-sm"
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* Mobile: Show current page info */}
        <PaginationItem className="sm:hidden">
          <span className="px-3 py-2 text-sm text-gray-500">
            {currentPage} من {totalPages}
          </span>
        </PaginationItem>

        <PaginationItem>
          <PaginationNext
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            className={cn(
              currentPage === totalPages && "pointer-events-none opacity-50",
              "cursor-pointer text-sm"
            )}
            aria-disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ProductPagination;
