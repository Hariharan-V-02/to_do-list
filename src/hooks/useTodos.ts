import { useState, useEffect, useCallback, useMemo } from 'react';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  category: 'work' | 'personal' | 'shopping';
  dueDate?: Date;
  createdAt: Date;
}

export type FilterType = 'all' | 'active' | 'completed';

interface UseTodosReturn {
  todos: Todo[];
  addTodo: (text: string, category: Todo['category'], dueDate?: Date) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  clearCompleted: () => void;
  filteredTodos: Todo[];
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  todosCount: {
    total: number;
    active: number;
    completed: number;
  };
}

export const useTodos = (): UseTodosReturn => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      const parsed = JSON.parse(saved);
      return parsed.map((todo: any) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
        dueDate: todo.dueDate ? new Date(todo.dueDate) : undefined,
      }));
    }
    return [];
  });

  const [filter, setFilter] = useState<FilterType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

   useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((text: string, category: Todo['category'], dueDate?: Date) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      text: text.trim(),
      completed: false,
      category,
      dueDate,
      createdAt: new Date(),
    };
    setTodos(prev => [newTodo, ...prev]);
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  }, []);

   const filteredTodos = useMemo(() => {
    let filtered = todos;

    // status filter
    if (filter === 'active') {
      filtered = filtered.filter(todo => !todo.completed);
    } else if (filter === 'completed') {
      filtered = filtered.filter(todo => todo.completed);
    }

    //  category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(todo => todo.category === categoryFilter);
    }

    //  search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(todo =>
        todo.text.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [todos, filter, searchQuery, categoryFilter]);

   const todosCount = useMemo(() => ({
    total: todos.length,
    active: todos.filter(todo => !todo.completed).length,
    completed: todos.filter(todo => todo.completed).length,
  }), [todos]);

  return {
    todos,
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
  };
};