import { Box, Button, Text } from "@chakra-ui/react";

function SimplePagination({ currentPage = 1, setCurrentPage, totalPages = 5 }) {
  const goToPage = (pageNumber) => setCurrentPage(pageNumber);

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Box display="flex" alignItems="center" justifyContent="center" gap={6}>
      <Button mx={1} onClick={goToPreviousPage} disabled={currentPage === 1}>
        Prev
      </Button>

      <Text mx={1}>{`Page ${currentPage} of ${totalPages}`}</Text>

      <Button mx={1} onClick={goToNextPage} disabled={currentPage === totalPages}>
        Next
      </Button>
    </Box>
  );
}

export default SimplePagination;
