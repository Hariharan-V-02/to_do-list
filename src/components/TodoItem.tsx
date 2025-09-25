import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Checkbox,
  Typography,
  IconButton,
  Chip,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Work as WorkIcon,
  Person as PersonIcon,
  ShoppingCart as ShoppingIcon,
  CalendarToday as CalendarIcon,
} from '@mui/icons-material';
import type { Todo } from '../hooks/useTodos';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const categoryIcons = {
  work: <WorkIcon sx={{ fontSize: 16 }} />,
  personal: <PersonIcon sx={{ fontSize: 16 }} />,
  shopping: <ShoppingIcon sx={{ fontSize: 16 }} />,
};

const categoryColors = {
  work: '#1976d2',
  personal: '#4caf50', 
  shopping: '#9c27b0',
};

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  const [openDelete, setOpenDelete] = useState(false);
  const [openComplete, setOpenComplete] = useState(false);

  const isOverdue = todo.dueDate && !todo.completed && new Date() > todo.dueDate;
  const isDueSoon = todo.dueDate && !todo.completed && new Date() <= todo.dueDate && new Date(Date.now() + 24 * 60 * 60 * 1000) >= todo.dueDate;

  const formatDueDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString();
    }
  };

  const handleDelete = () => {
    onDelete(todo.id);
    setOpenDelete(false);
  };

  const handleComplete = () => {
    onToggle(todo.id);
    setOpenComplete(false);
  };

  return (
    <>
      <Card
        sx={{
          mb: 1,
          transition: 'all 0.3s ease',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            transform: 'translateY(-1px)',
          },
          opacity: todo.completed ? 0.7 : 1,
          backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#2c2c2c' : '#ffffff',
          borderLeft: `4px solid ${categoryColors[todo.category]}`,
        }}
      >
        <CardContent sx={{ py: 1.5, px: 2, '&:last-child': { pb: 1.5 } }}>
          <Box display="flex" alignItems="center" gap={1}>
            <Checkbox
              checked={todo.completed}
              onChange={() => setOpenComplete(true)}
              sx={{
                color: categoryColors[todo.category],
                '&.Mui-checked': {
                  color: '#4caf50',
                },
              }}
            />
            
            <Box flex={1} minWidth={0}>
              <Typography
                variant="body1"
                sx={{
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed 
                    ? (theme) => theme.palette.text.secondary
                    : (theme) => theme.palette.text.primary,
                  wordBreak: 'break-word',
                  fontSize: '0.95rem',
                }}
              >
                {todo.text}
              </Typography>
              
              <Box display="flex" alignItems="center" gap={1} mt={0.5}>
                <Chip
                  icon={categoryIcons[todo.category]}
                  label={todo.category}
                  size="small"
                  sx={{
                    backgroundColor: `${categoryColors[todo.category]}20`,
                    color: categoryColors[todo.category],
                    fontWeight: 500,
                    fontSize: '0.75rem',
                    height: 20,
                  }}
                />
                
                {todo.dueDate && (
                  <Chip
                    icon={<CalendarIcon sx={{ fontSize: 14 }} />}
                    label={formatDueDate(todo.dueDate)}
                    size="small"
                    sx={{
                      backgroundColor: isOverdue 
                        ? 'rgba(244, 67, 54, 0.1)'
                        : isDueSoon 
                        ? 'rgba(255, 193, 7, 0.1)'
                        : 'rgba(158, 158, 158, 0.2)',
                      color: isOverdue 
                        ? '#f44336'
                        : isDueSoon 
                        ? '#ff9800'
                        : (theme) => theme.palette.text.secondary,
                      fontWeight: 500,
                      fontSize: '0.75rem',
                      height: 20,
                    }}
                  />
                )}
              </Box>
            </Box>
            
            <IconButton
              onClick={() => setOpenDelete(true)}
              size="small"
              sx={{
                color: (theme) => theme.palette.text.secondary,
                '&:hover': {
                  color: '#f44336',
                  backgroundColor: 'rgba(244, 67, 54, 0.1)',
                },
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Box>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>Delete Todo</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this Todo?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

 {/* Complete Confirmation Dialog */}
       <Dialog open={openComplete} onClose={() => setOpenComplete(false)}>
        <DialogTitle>Mark Complete</DialogTitle>
        <DialogContent>
          Are you sure you want to mark this Todo as complete?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenComplete(false)}>Cancel</Button>
          <Button onClick={handleComplete} variant="contained" color="success">
            Complete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
