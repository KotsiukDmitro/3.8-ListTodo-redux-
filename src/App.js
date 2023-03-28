
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro'
import { addTodo, removeTodo, removeAllTodo, toggleComplete, edit } from './store/todoSlice';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function App() {

  const [text, setText] = useState('')

  function todo(event) {
    setText(event.target.value.trim())
  }
  const dispatch = useDispatch()
  function add() {
    if (text.trim().length) {
      dispatch(addTodo(text.trim()))
      setText('')
    }
  }
  function keyDownAdd(event) {
    if (event.key === 'Enter') {
      add()
      setText('')
    }
  }
  const listTodo = useSelector(state => state.todos.todos)

  function remove(id) {
    dispatch(removeTodo({ id }))
  }
  function removeAll() {
    dispatch(removeAllTodo())
  }
  function toggle(id) {
    dispatch(toggleComplete({ id }))
  }

  const [todoEdit, setTodoEdit] = useState({})

  function editTodo(idEditTodo, textEditTodo) {
    const saveTodo = {}
    saveTodo.idCurrent = idEditTodo
    saveTodo.textCurrent = textEditTodo
    setTodoEdit(saveTodo)
  }
  function saveEditTodo(event) {
    setTodoEdit({ ...todoEdit, textCurrent: event.target.value })
  }

  function save() {
    if (todoEdit.textCurrent === '') {
      remove(todoEdit.idCurrent)
    } else {
      setTodoEdit(dispatch(edit({ todoEdit })))
    }
    setTodoEdit({})
  }

  useEffect(() => {
    localStorage.setItem('listTodo', JSON.stringify(listTodo))
  }, [listTodo])

  return (<>
    <div className='container'>
      <h3 className='title'>Список дел</h3>
      <div className='textTodo'>
        <input type='text' className='inputTodo' placeholder='Напиши здесь todo' value={text} onChange={todo} onKeyDown={keyDownAdd}></input>
        <button className='btn' onClick={add}>Добавить</button>
      </div>
      <ul className='list'>
        {listTodo.map((item) => {
          return (
            <li className='item' key={item.id}>
              {item.id !== todoEdit.idCurrent
                ? <><input type='checkbox' className='cursor' checked={item.completed} onChange={() => toggle(item.id)}></input>
                  <span className='text-todo'>{item.text}</span>
                  <FontAwesomeIcon icon={solid("pen")} className=' icon icon-pen cursor' onClick={() => editTodo(item.id, item.text)} />
                  <FontAwesomeIcon icon={solid("trash")} className='icon cursor' onClick={() => remove(item.id)} /></>
                : <><input type='text' value={todoEdit.textCurrent} onChange={saveEditTodo}></input>
                  <button onClick={save} className='cursor'>save</button></>
              }
            </li>
          )
        })}
      </ul>
      <div className='clear' >
        <button className='btn-clear' onClick={removeAll}>Удалить все</button>
      </div>
    </div>
  </>
  );
}
export default App;
