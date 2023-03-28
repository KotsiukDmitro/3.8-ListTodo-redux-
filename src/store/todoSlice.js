import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: 'todo',
    initialState: {
        todos: JSON.parse(localStorage.getItem('listTodo')) || []
    },
    reducers: {
        addTodo(state, action) {
            state.todos.unshift({
                id: new Date().toISOString(),
                text: action.payload,
                completed: false,
            })
        },
        removeTodo(state, action) {
            state.todos = state.todos.filter(item => item.id !== action.payload.id)
        },
        removeAllTodo(state) {
            state.todos = []
        },
        toggleComplete(state, action) {
            const toggleTodo = state.todos.find(item => item.id === action.payload.id)
            toggleTodo.completed = !toggleTodo.completed
        },
        edit(state, action) {
            state.todos = state.todos.map(item => {
                if (item.id === action.payload.id) {
                    item.text = action.payload.text
                }
                return item
            })
        }
    }
})

export const { addTodo, removeTodo, removeAllTodo, toggleComplete, edit } = todoSlice.actions
export default todoSlice.reducer
