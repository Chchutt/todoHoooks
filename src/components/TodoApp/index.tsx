import React, { useState } from 'react';
import { Iitems } from '../../models';
import { AppHeader } from '../AppHeader';
import { Footer } from '../Footer';
import { TaskList } from '../TaskList';

import './index.css';

export function TodoApp(): React.ReactElement {
  function createTodoItem(text: string, num = '1'): Iitems {
    return {
      id: num + 1,
      description: text,
      editing: false,
      done: false,
      date: new Date(),
    };
  }
  const [todoData, setElemTodo] = useState([
    createTodoItem('Completed task', '1'),
    createTodoItem('Editing task', '2'),
    createTodoItem('Active task', '3'),
  ]);
  const [filterTag, setFilterTag] = useState('all');

  const count = todoData.filter((elem) => elem.done).length;

  const activeCount = todoData.length - count;

  const filterTask = (filter: string) => {
    switch (filter) {
      case 'active':
        return setFilterTag('active');
      case 'completed':
        return setFilterTag('completed');
      case 'clear':
        return setElemTodo([...todoData.filter((el) => !el.done)]);
      default:
        return setFilterTag('all');
    }
  };
  function onToggleActive(id: string) {
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
    const newItem = { ...oldItem, done: !oldItem.done };
    const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
    setElemTodo(() => newArray);
  }

  function onToggleLeft(id: string) {
    const idx = todoData.findIndex((el) => el.id === id);
    const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
    setElemTodo(() => newArray);
  }

  function newDescription(id: string, description: string) {
    const idx = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[idx];
    const newItem = { ...oldItem, description: description };
    const newArray = [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)];
    setElemTodo(() => newArray);
  }

  return (
    <section className="todoapp">
      <AppHeader createTodoItem={createTodoItem} setElemTodo={setElemTodo} />
      <section className="mane">
        <TaskList
          todoData={todoData}
          setElemTodo={setElemTodo}
          newDescription={newDescription}
          onToggleLeft={onToggleLeft}
          onToggleActive={onToggleActive}
          filterTag={filterTag}
        />
        <Footer count={count} activeCount={activeCount} filterTask={filterTask} todoData={todoData} />
      </section>
    </section>
  );
}
