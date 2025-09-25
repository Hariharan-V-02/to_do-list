import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  Card,
  CardContent,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import type { Todo } from '../hooks/useTodos';
import toast, { Toaster } from 'react-hot-toast';

interface AddTodoFormProps {
  onAddTodo: (text: string, category: Todo['category'], dueDate?: Date) => void;
}

interface FormData {
  text: string;
  category: Todo['category'];
  dueDate: string;
}

export const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAddTodo }) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<FormData>({
    defaultValues: {
      text: '',
      category: 'personal',
      dueDate: '',
    },
    mode: 'onChange',
  });

  const onSubmit = (data: FormData) => {
    const dueDate = data.dueDate ? new Date(data.dueDate) : undefined;
    onAddTodo(data.text, data.category, dueDate);
    reset();
    toast.success('Todo added successfully!');
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && event.ctrlKey) {
      handleSubmit(onSubmit)();
    }
  };

  return (
          <><Toaster position="top-right" reverseOrder={false} />
          <Card
      sx={{
        mb: 3,
        background: (theme) => theme.palette.mode === 'dark'
          ? 'linear-gradient(180deg, #2c2c2c, #1e1e1e)'
          : 'linear-gradient(180deg, #ffffff, #f5f5f5)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        borderRadius: '12px',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Typography
          variant="h6"
          sx={{
            mb: 2,
            color: (theme) => theme.palette.text.primary,
            fontWeight: 600,
          }}
        >
          Add New Todo
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} onKeyDown={handleKeyPress}>
          <Box display="flex" flexDirection="column" gap={2}>
            <Controller
              name="text"
              control={control}
              rules={{
                required: 'Todo text is required',
                minLength: {
                  value: 1,
                  message: 'Todo must be at least 1 character',
                },
                maxLength: {
                  value: 200,
                  message: 'Todo must be less than 200 characters',
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="What needs to be done?"
                  variant="outlined"
                  fullWidth
                  error={!!errors.text}
                  helperText={errors.text?.message}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#2c2c2c' : '#ffffff',
                      '& fieldset': {
                        borderColor: (theme) => theme.palette.mode === 'dark' ? '#555' : '#e0e0e0',
                      },
                      '&:hover fieldset': {
                        borderColor: (theme) => theme.palette.primary.main,
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: (theme) => theme.palette.primary.main,
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: (theme) => theme.palette.text.secondary,
                      '&.Mui-focused': {
                        color: (theme) => theme.palette.primary.main,
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      color: (theme) => theme.palette.text.primary,
                    },
                  }} />
              )} />

            <Box display="flex" gap={2}>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <FormControl sx={{ minWidth: 120 }}>
                    <InputLabel
                      sx={{
                        color: (theme) => theme.palette.text.secondary,
                        '&.Mui-focused': {
                          color: (theme) => theme.palette.primary.main,
                        },
                      }}
                    >
                      Category
                    </InputLabel>
                    <Select
                      {...field}
                      label="Category"
                      sx={{
                        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#2c2c2c' : '#ffffff',
                        '& .MuiOutlinedInput-notchedOutline': {
                          borderColor: (theme) => theme.palette.mode === 'dark' ? '#555' : '#e0e0e0',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: (theme) => theme.palette.primary.main,
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: (theme) => theme.palette.primary.main,
                        },
                        '& .MuiSelect-select': {
                          color: (theme) => theme.palette.text.primary,
                        },
                      }}
                    >
                      <MenuItem value="work">Work</MenuItem>
                      <MenuItem value="personal">Personal</MenuItem>
                      <MenuItem value="shopping">Shopping</MenuItem>
                    </Select>
                  </FormControl>
                )} />

              <Controller
                name="dueDate"
                control={control}
                rules={{
                  required: 'Due date is required',
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Due Date"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    error={!!errors.dueDate}
                    sx={{
                      minWidth: 150,
                      '& .MuiOutlinedInput-root': {
                        backgroundColor: (theme) => theme.palette.mode === 'dark' ? '#2c2c2c' : '#ffffff',
                        '& fieldset': {
                          borderColor: (theme) => theme.palette.mode === 'dark' ? '#555' : '#e0e0e0',
                        },
                        '&:hover fieldset': {
                          borderColor: (theme) => theme.palette.primary.main,
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: (theme) => theme.palette.primary.main,
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: (theme) => theme.palette.text.secondary,
                        '&.Mui-focused': {
                          color: (theme) => theme.palette.primary.main,
                        },
                      },
                      '& .MuiOutlinedInput-input': {
                        color: (theme) => theme.palette.text.primary,
                      },
                    }} />
                )} />

              <Button
                type="submit"
                variant="contained"
                startIcon={<AddIcon />}
                disabled={!isValid}
                sx={{
                  backgroundColor: (theme) => theme.palette.primary.main,
                  color: (theme) => theme.palette.primary.contrastText,
                  fontWeight: 600,
                  px: 3,
                  '&:hover': {
                    backgroundColor: (theme) => theme.palette.primary.dark,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  },
                  '&:disabled': {
                    backgroundColor: (theme) => theme.palette.action.disabledBackground,
                    color: (theme) => theme.palette.action.disabled,
                  },
                  textTransform: 'none',
                }}
              >
                Add Todo
              </Button>
            </Box>

          </Box>
        </form>
      </CardContent>
    </Card></>
  );
};