import React from 'react';
import { 
  Box, 
  Chip, 
  Typography,
  Paper,
} from '@mui/material';
import {
  Work as WorkIcon,
  Person as PersonIcon,
  ShoppingCart as ShoppingIcon,
  ViewList as AllIcon,
} from '@mui/icons-material';

interface CategoryFilterProps {
  categoryFilter: string;
  onCategoryChange: (category: string) => void;
  todosCount: {
    total: number;
    active: number;
    completed: number;
  };
}

const categories = [
  { key: 'all', label: 'All', icon: <AllIcon sx={{ fontSize: 16 }} /> },
  { key: 'work', label: 'Work', icon: <WorkIcon sx={{ fontSize: 16 }} /> },
  { key: 'personal', label: 'Personal', icon: <PersonIcon sx={{ fontSize: 16 }} /> },
  { key: 'shopping', label: 'Shopping', icon: <ShoppingIcon sx={{ fontSize: 16 }} /> },
];

const categoryColors = {
  all: '#1976d2',
  work: '#1976d2', 
  personal: '#4caf50',
  shopping: '#9c27b0',
};

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categoryFilter,
  onCategoryChange,
  todosCount,
}) => {
  return (
    <Paper
      sx={{
        p: 2,
        mb: 2,
        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#2c2c2c' : '#ffffff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <Typography
        variant="subtitle2"
        sx={{
          mb: 1.5,
          color: (theme) => theme.palette.text.primary,
          fontWeight: 600,
        }}
      >
        Filter by Category
      </Typography>
      
      <Box display="flex" flexWrap="wrap" gap={1}>
        {categories.map((category) => (
          <Chip
            key={category.key}
            icon={category.icon}
            label={category.label}
            onClick={() => onCategoryChange(category.key)}
            variant={categoryFilter === category.key ? 'filled' : 'outlined'}
            sx={{
              backgroundColor: categoryFilter === category.key 
                ? `${categoryColors[category.key as keyof typeof categoryColors]}20`
                : 'transparent',
              borderColor: categoryColors[category.key as keyof typeof categoryColors],
              color: categoryFilter === category.key
                ? categoryColors[category.key as keyof typeof categoryColors]
                : (theme) => theme.palette.text.secondary,
              fontWeight: categoryFilter === category.key ? 600 : 400,
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: `${categoryColors[category.key as keyof typeof categoryColors]}15`,
                borderColor: categoryColors[category.key as keyof typeof categoryColors],
                color: categoryColors[category.key as keyof typeof categoryColors],
                transform: 'translateY(-1px)',
              },
              '& .MuiChip-icon': {
                color: 'inherit',
              },
            }}
          />
        ))}
      </Box>
      
      <Box
        sx={{
          mt: 2,
          pt: 1.5,
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          variant="caption"
          sx={{ color: (theme) => theme.palette.text.secondary }}
        >
          Total: {todosCount.total} todos
        </Typography>
        <Typography
          variant="caption"
          sx={{ color: (theme) => theme.palette.text.secondary }}
        >
          Active: {todosCount.active} | Completed: {todosCount.completed}
        </Typography>
      </Box>
    </Paper>
  );
};