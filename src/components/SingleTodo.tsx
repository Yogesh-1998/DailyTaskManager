import React, { useEffect, useRef, useState } from 'react'
import { Todo } from '../model';
import {AiFillEdit , AiFillDelete} from 'react-icons/ai';
import {MdDone} from 'react-icons/md'
import { Draggable } from 'react-beautiful-dnd';

interface Props{
    index: number;
    todo: Todo;
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const SingleTodo: React.FC<Props> = ({todo, todos, setTodos, index}) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);
    const inputRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setTodos(todos.map((todo) => 
            todo.id === todo.id ? {...todo, todo: editTodo} : todo
        ));
        setEdit(false);
    }

    const handleDelete = (id: Number) => {
        setTodos(todos.filter((todo) => todo.id !== id ))
    };

    const handleDone = (id: Number) => {
        setTodos(todos.map((todo) => 
        todo.id === id ? {...todo, isDone : !todo.isDone} : todo
    ))};

  
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
        {(provided, snapshot)=>(        
            <form className={`todo_single ${snapshot.isDragging ? "drag" : ""}`}  
            onSubmit={(e)=>handleEdit(e, todo.id)}
            ref={provided.innerRef} 
            {...provided.dragHandleProps} 
            {...provided.draggableProps}
            >
                {edit ? (<input className='todo_single--text' ref = {inputRef} value={editTodo} onChange={e => setEditTodo(e.target.value)}/>)
                :
                todo.isDone ? 
                    (<s className='todo_single--text'>{todo.todo}</s>) : 
                    (<span className='todo_single--text'>{todo.todo}</span>)
                    }

                <div className="icon" onClick={() => {
                        if (!edit && !todo.isDone) {
                        setEdit(!edit);
                        }
                    }}>
                    <AiFillEdit></AiFillEdit>
                </div>
                <div className="icon" onClick={() => handleDelete(todo.id)}>
                    <AiFillDelete></AiFillDelete>
                </div>
                <div className="icon" onClick={() => handleDone(todo.id)}>
                    <MdDone></MdDone>
                </div>
            </form>
        )}
    </Draggable>
  )
}

export default SingleTodo