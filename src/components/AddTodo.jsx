import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, updateTodo, setEditingTodo } from '../features/todo';

const AddTodo = () => {
    const [todo, setTodo] = useState('');
    const dispatch = useDispatch();
    const { editingTodo, todos } = useSelector((state) => state);

    // When the editingTodo changes, update the input field
    useEffect(() => {
        if (editingTodo) {
            setTodo(editingTodo.text);  // Load the text of the todo to be edited
        }
    }, [editingTodo]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (todo.trim()) {
            if (editingTodo) {
                // If editingTodo exists, we update it
                dispatch(updateTodo({ id: editingTodo.id, newText: todo }));
            } else {
                // Otherwise, we add a new todo
                dispatch(addTodo(todo));
            }
            setTodo('');
            dispatch(setEditingTodo(null));  // Reset editingTodo after saving
        }
    };

    useEffect(() => {
        // Sync todos with localStorage whenever the todos state changes
        if (todos.length > 0) {
            localStorage.setItem("todos", JSON.stringify(todos));
        }
    }, [todos]);

    return (
        <div className='h-auto w-full flex flex-col items-center justify-end gap-4'>
            <form onSubmit={handleSubmit} className='p-4 rounded w-[800px] flex justify-center items-center gap-5'>
                <input
                    type="text"
                    placeholder=''
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    className='px-2 py-3 rounded bg-transparent w-full border focus:bg-gray-800 font-semibold text-center outline-none'
                    autoFocus="true"
                />
            </form>
        </div>
    );
};

export default AddTodo;
