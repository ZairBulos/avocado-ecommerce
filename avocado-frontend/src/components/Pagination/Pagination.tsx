import { Pagination } from "@nextui-org/react";

function CustomPagination({ totalPages, handlePageChange }: { totalPages: number, handlePageChange: (current: number) => void }) {
  return (
    <div className="flex justify-center items-center">
      <Pagination 
        loop 
        showControls 
        color="success" 
        total={totalPages} 
        initialPage={1}
        onChange={handlePageChange}
      />
    </div>
  );
}

export default CustomPagination;
