import React from 'react';
import { TextField, Button } from '@mui/material';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery, handleSearch }) => {
  return (
    <>
      <TextField
        label="Rechercher une carte"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ marginBottom: 3 }}
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>Rechercher</Button>
    </>
  );
};

export default SearchBar;
