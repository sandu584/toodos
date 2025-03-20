import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    todos: [],
    editingTodo: null
};

const todoSlice = createSlice({
    name: "todo",
    initialState,
    reducers: {
        setAllTodos: (state, action) => {
            state.todos = action.payload;  // Directly replace the todos array
        },
        addTodo: (state, action) => {
            const newTodo = {
                id: nanoid(),
                text: action.payload,
            };
            state.todos.unshift(newTodo);
            localStorage.setItem("todos", JSON.stringify(state.todos));  // Sync localStorage with Redux
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
            localStorage.setItem("todos", JSON.stringify(state.todos));  // Sync localStorage with Redux
        },
        updateTodo: (state, action) => {
            const { id, newText } = action.payload;
            const todo = state.todos.find(todo => todo.id === id);
            if (todo) {
                todo.text = newText
            }
            state.editingTodo = null;  // Reset editing state after saving
            localStorage.setItem("todos", JSON.stringify(state.todos));  // Sync localStorage with Redux
        },
        setEditingTodo: (state, action) => {
            state.editingTodo = action.payload;  // Set the todo to be edited
        }
    }
});

export const { addTodo, removeTodo, updateTodo, setEditingTodo, setAllTodos } = todoSlice.actions;

export default todoSlice.reducer;
