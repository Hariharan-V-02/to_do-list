import React from 'react';
import { TextField, InputAdornment, Box } from '@mui/material';
import { Search as SearchIcon, Clear as ClearIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearchChange }) => {
  const handleClear = () => {
    onSearchChange('');
  };

  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        fullWidth
        placeholder="Search todos..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        variant="outlined"
        size="medium"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: (theme) => theme.palette.text.secondary }} />
            </InputAdornment>
          ),
          endAdornment: searchQuery && (
            <InputAdornment position="end">
              <IconButton
                onClick={handleClear}
                size="small"
                sx={{
                  color: (theme) => theme.palette.text.secondary,
                  '&:hover': {
                    color: (theme) => theme.palette.text.primary,
                    backgroundColor: (theme) => theme.palette.action.hover,
                  },
                }}
              >
                <ClearIcon fontSize="small" />
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#2c2c2c' : '#ffffff',
            transition: 'all 0.3s ease',
            '& fieldset': {
              borderColor: (theme) => theme.palette.mode === 'dark' ? '#555' : '#e0e0e0',
            },
            '&:hover fieldset': {
              borderColor: (theme) => theme.palette.primary.main,
            },
            '&.Mui-focused fieldset': {
              borderColor: (theme) => theme.palette.primary.main,
              boxShadow: (theme) => `0 0 0 2px ${theme.palette.primary.main}20`,
            },
          },
          '& .MuiOutlinedInput-input': {
            color: (theme) => theme.palette.text.primary,
            '&::placeholder': {
              color: (theme) => theme.palette.text.secondary,
              opacity: 1,
            },
          },
        }}
      />
    </Box>
  );
};