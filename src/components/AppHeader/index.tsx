import React, { Dispatch, SetStateAction } from 'react';
import { Iitems } from '../../models';
import { NewTaskForm } from '../NewTaskForm';

import './index.css';

interface IAppHeader {
  createTodoItem: (text: string, num: string) => Iitems;
  setElemTodo: Dispatch<SetStateAction<Iitems[]>>;
}

export function AppHeader({ createTodoItem, setElemTodo }: IAppHeader): React.ReactElement {
  return (
    <header className="header__container">
      <h1 className="header__text">TODOS</h1>
      <NewTaskForm createTodoItem={createTodoItem} setElemTodo={setElemTodo} />
    </header>
  );
}
