import React from 'react';
import { Pagination } from '@mui/material';

interface PaginationControlProps {
  totalCards: number;
  cardsPerPage: number;
  currentPage: number;
  handlePageChange: (event: React.ChangeEvent<unknown>, page: number) => void;
}

const PaginationControl: React.FC<PaginationControlProps> = ({ totalCards, cardsPerPage, currentPage, handlePageChange }) => {
  return (
    <Pagination
      count={Math.ceil(totalCards / cardsPerPage)}
      page={currentPage}
      onChange={handlePageChange}
      color="primary"
      showFirstButton
      showLastButton
      sx={{
        marginTop: 2,
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: 2,
      }}
    />
  );
};

export default PaginationControl;
