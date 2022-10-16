import React, { Dispatch, SetStateAction, useState } from 'react';
import { Iitems } from '../../models';
import './index.css';

interface INewTaskForm {
  createTodoItem: (text: string, num: string) => Iitems;
  setElemTodo: Dispatch<SetStateAction<Iitems[]>>;
}

export function NewTaskForm({ createTodoItem, setElemTodo }: INewTaskForm): React.ReactElement {
  const [description, setDescription] = useState('');

  function onLabelChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setDescription(event.target.value);
  }
  function onSubmit(event: React.KeyboardEvent<HTMLInputElement>): void {
    const number: string = Math.random().toString();
    event.preventDefault();
    setElemTodo((prev) => [createTodoItem(description, number), ...prev]);
    setDescription('');
  }

  return (
    <React.Fragment>
      <input
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            return onSubmit(e);
          } else {
            return onLabelChange;
          }
        }}
        type="text"
        placeholder="What needs to be done?"
        className="new-todo"
        autoFocus
        onChange={onLabelChange}
        value={description}
      />
      <input className="new-todo-form__timer" placeholder="Min" autoFocus />
      <input className="new-todo-form__timer" placeholder="Sec" autoFocus />
    </React.Fragment>
  );
}
