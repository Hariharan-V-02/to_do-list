import  { useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Paper,
  Link,
} from '@mui/material';
import {
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  CheckCircle as CompletedIcon,
  RadioButtonUnchecked as ActiveIcon,
  ViewList as AllIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';

import { useTodos, type FilterType } from '../hooks/useTodos';
import { useTheme } from '../contexts/ThemeContext';
import { TodoItem } from '../components/TodoItem';
import { AddTodoForm } from '../components/AddTodoForm';
import { SearchBar } from '../components/SearchBar';
import { CategoryFilter } from '../components/CategoryFilter';
import GitHubIcon from "@mui/icons-material/GitHub";

const Index = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const {
    addTodo,
    toggleTodo,
    deleteTodo,
    clearCompleted,
    filteredTodos,
    filter,
    setFilter,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    todosCount,
  } = useTodos();

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
        e.preventDefault();
        toggleTheme();
      }
      
      if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
        e.preventDefault();
        const searchInput = document.querySelector(
          'input[placeholder="Search todos..."]'
        ) as HTMLInputElement;
        if (searchInput) {
          searchInput.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleTheme]);

  const filterButtons = [
    { key: 'all' as FilterType, label: 'All', icon: <AllIcon fontSize="small" /> },
    { key: 'active' as FilterType, label: 'Active', icon: <ActiveIcon fontSize="small" /> },
    { key: 'completed' as FilterType, label: 'Completed', icon: <CompletedIcon fontSize="small" /> },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: (theme) =>
          theme.palette.mode === 'dark' ? '#121212' : '#f5f5f5',
        transition: 'background-color 0.3s ease',
        py: 4,
      }}
    >
      <Container maxWidth="md">
        {/* Header */}
        <Paper
          sx={{
            p: 3,
            mb: 3,
            background: 'linear-gradient(135deg, #7b2ff7, #f107a3)',
            color: '#ffffff',
            textAlign: 'center',
            boxShadow: '0 8px 24px rgba(25, 118, 210, 0.15)',
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Box />
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 800,
                fontSize: { xs: '2rem', md: '3rem' },
                textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              Todo List
            </Typography>
            <IconButton
              onClick={toggleTheme}
              sx={{
                color: 'inherit',
                backgroundColor: 'rgba(255,255,255,0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.2)',
                },
              }}
            >
              {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
            </IconButton>
          </Box>

          <Typography
            variant="h6"
            sx={{
              opacity: 0.9,
              fontWeight: 400,
              mb: 2,
            }}
          >
            Organize your tasks, boost your productivity
          </Typography>

          <Typography
            variant="body2"
            sx={{
              opacity: 0.8,
              fontStyle: 'italic',
            }}
          >
            Keyboard shortcuts: Ctrl+D (toggle theme) • Ctrl+F (search)
          </Typography>
        </Paper>

        {/* Add Todo Form */}
        <AddTodoForm onAddTodo={addTodo} />

        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <CategoryFilter
          categoryFilter={categoryFilter}
          onCategoryChange={setCategoryFilter}
          todosCount={todosCount}
        />

        {/* Filter Buttons */}
        <Paper
          sx={{
            p: 2,
            mb: 3,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#2c2c2c' : '#ffffff',
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <ButtonGroup variant="outlined" size="small">
              {filterButtons.map((btn) => (
                <Button
                  key={btn.key}
                  onClick={() => setFilter(btn.key)}
                  startIcon={btn.icon}
                  variant={filter === btn.key ? 'contained' : 'outlined'}
                  sx={{
                    borderColor: '#1976d2',
                    color: filter === btn.key ? '#ffffff' : '#1976d2',
                    backgroundColor:
                      filter === btn.key ? '#1976d2' : 'transparent',
                    '&:hover': {
                      backgroundColor:
                        filter === btn.key
                          ? '#1565c0'
                          : 'rgba(25, 118, 210, 0.1)',
                    },
                  }}
                >
                  {btn.label} (
                  {btn.key === 'all'
                    ? todosCount.total
                    : btn.key === 'active'
                    ? todosCount.active
                    : todosCount.completed}
                  )
                </Button>
              ))}
            </ButtonGroup>

            {todosCount.completed > 0 && (
              <Button
                variant="outlined"
                color="error"
                size="small"
                startIcon={<ClearIcon />}
                onClick={clearCompleted}
                sx={{
                  borderColor: '#f44336',
                  color: '#f44336',
                  '&:hover': {
                    backgroundColor: 'rgba(244, 67, 54, 0.1)',
                  },
                }}
              >
                Clear Completed
              </Button>
            )}
          </Box>
        </Paper>

        {/* Todo List */}
        <Box>
          {filteredTodos.length === 0 ? (
            <Paper
              sx={{
                p: 6,
                textAlign: 'center',
                backgroundColor: (theme) =>
                  theme.palette.mode === 'dark' ? '#2c2c2c' : '#ffffff',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: (theme) => theme.palette.text.secondary,
                  mb: 1,
                }}
              >
                {searchQuery || categoryFilter !== 'all'
                  ? 'No todos match your filters'
                  : todosCount.total === 0
                  ? 'No todos yet'
                  : filter === 'active'
                  ? 'No active todos'
                  : 'No completed todos'}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: (theme) => theme.palette.text.secondary }}
              >
                {todosCount.total === 0
                  ? 'Add your first todo above to get started!'
                  : 'Try adjusting your filters or search query.'}
              </Typography>
            </Paper>
          ) : (
            filteredTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
              />
            ))
          )}
        </Box>

        {/* Footer */}
        <Box
          sx={{
            mt: 4,
            pt: 3,
            borderTop: (theme) => `1px solid ${theme.palette.divider}`,
            textAlign: 'center',
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: (theme) => theme.palette.text.secondary }}
          >
            Developed by{' '}
            <Link
              href="https://github.com/Hariharan-V-02/to-do-list"
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              sx={{ fontWeight: 500 }}
            >
              Hariharan V
            </Link>
          </Typography>

          <IconButton
            component="a"
            href="https://github.com/Hariharan-V-02/to-do-list"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ mt: 1 }}
          >
            <GitHubIcon />
          </IconButton>
        </Box>
      </Container>
    </Box>
  );
};

export default Index;
