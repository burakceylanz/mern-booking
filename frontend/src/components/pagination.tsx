import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  page: number;
  pages: number;
  onPageChange: (page: number) => void;
};

export default function PaginationBar({ page, pages, onPageChange }: Props) {
  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={page === 1 ? undefined : () => onPageChange(page - 1)}
          />
        </PaginationItem>
        {pageNumbers.map((number) => (
          <PaginationItem>
            <PaginationLink
              className={`${page === number && "bg-[#7cc475] text-white"}`}
              onClick={() => onPageChange(number)}
            >
              {number}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext onClick={() => onPageChange(page + 1)} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
