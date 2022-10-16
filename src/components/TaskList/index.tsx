import React, { Dispatch, SetStateAction } from 'react';
import { Iitems } from '../../models';
import { Task } from '../Item';

import './index.css';

interface TaskListProps {
  todoData: Iitems[];
  setElemTodo: Dispatch<SetStateAction<Iitems[]>>;
  newDescription: (id: string, description: string) => void;
  onToggleLeft: (id: string) => void;
  onToggleActive: (id: string) => void;
  filterTag: string;
}

export function TaskList({
  filterTag,
  onToggleActive,
  todoData,
  setElemTodo,
  onToggleLeft,
  newDescription,
}: TaskListProps): React.ReactElement {
  const element = todoData.map((item) => {
    const { description, id, done, date } = item;
    if (filterTag === 'active' && !done) {
      return (
        <Task
          date={date}
          description={description}
          key={id}
          id={id}
          done={done}
          onToggleActive={onToggleActive}
          onToggleLeft={onToggleLeft}
          newDescription={newDescription}
          setElemTodo={setElemTodo}
        />
      );
    }
    if (filterTag === 'completed' && done) {
      return (
        <Task
          date={date}
          description={description}
          key={id}
          id={id}
          done={done}
          onToggleActive={onToggleActive}
          onToggleLeft={onToggleLeft}
          newDescription={newDescription}
          setElemTodo={setElemTodo}
        />
      );
    }
    if (filterTag === 'all') {
      return (
        <Task
          date={date}
          description={description}
          key={id}
          id={id}
          done={done}
          onToggleActive={onToggleActive}
          onToggleLeft={onToggleLeft}
          newDescription={newDescription}
          setElemTodo={setElemTodo}
        />
      );
    }
  });
  return <ul className="todo-list">{element}</ul>;
}
