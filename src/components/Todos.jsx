import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeTodo, setEditingTodo, setAllTodos } from '../features/todo.js';

const Todos = () => {
    const todos = useSelector(state => state.todos);
    const dispatch = useDispatch();

    const handleUpdateClick = (todo) => {
        dispatch(setEditingTodo(todo)); // Set the todo to be edited in the Redux store
    };

    useEffect(() => {
        // Check if there's data in localStorage and dispatch it to Redux state
        const storedTodos = localStorage.getItem("todos");
        if (storedTodos) {
            dispatch(setAllTodos(JSON.parse(storedTodos)));
        }
    }, [dispatch]);

    return (
        <div className='h-auto w-full flex flex-col justify-center items-center'>
            <div className='max-h-[620px] w-1/2 mb-3 border overflow-auto flex flex-col gap-5 p-2 rounded'>
                {todos.length === 0 ? (
                    <p className='text-center text-white font-bold text-2xl'>👀</p>
                ) : (
                    todos.map((todo) => (
                        <div
                            key={todo.id}
                            className='px-3 py-2 rounded border flex shadow-white hover:bg-slate-700 transition-all ease-in-out 0.1s bg-slate-900 justify-between text-white font-semibold'
                        >
                            <p>{todo.text}</p>
                            <div className='flex justify-between items-center gap-2'>
                                <button
                                    onClick={() => dispatch(removeTodo(todo.id))}
                                    className='px-2 py-1 border transition-all ease-in-out 0.1s hover:bg-white text-red-600 rounded-sm'
                                >
                                    R
                                </button>
                                <button
                                    onClick={() => handleUpdateClick(todo)}
                                    className='px-2 py-1 border transition-all ease-in-out 0.1s hover:bg-white text-emerald-600 rounded-sm'
                                >
                                    E
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Todos;
