import React, {Dispatch, SetStateAction, useEffect, useState} from 'react';
import { Iitems } from '../../models';
import { CreatingTimeForTask } from '../TimeForItem';

import './index.css';

interface ITask {
  description: string;
  key: string;
  id: string;
  done: boolean;
  date: Date;
  newDescription: (id: string, description: string) => void;
  onToggleLeft: (id: string) => void;
  setElemTodo: Dispatch<SetStateAction<Iitems[]>>;
  onToggleActive: (id: string) => void;
}

export function Task({ description, newDescription, onToggleLeft, onToggleActive, done, id, date }: ITask) {
  const [view, setView] = useState('hidden');
  const [divView, setDivView] = useState('view');
  const [nDescription, setnDescription] = useState('');
  const [counter, setCounter] = useState(0);
  const [intervalId, setIntervalId] = useState(0);
  const [timerTime, setTimer] = useState(0 + ':' + 0)

  function onToggleEdit() {
    setView('edit');
    setDivView('hidden');
  }
  function onToggleView() {
    setView('hidden');
    setDivView('view');
  }
  function onLabelChange(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault();
    setnDescription(event.target.value);
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    newDescription(id, nDescription);
    localStorage.setItem('time' + id, '0');
    onToggleView();
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  const boxCheck = () => {};

  function timer() {
    if (localStorage.getItem('time' + id) === null) {
      localStorage.setItem('time' + id, '0');
    }
    const idInt = window.setInterval(() => {
      const time: string | number = localStorage.getItem('time' + id) as string;
      const newTime: number = Number(time) + 1;
      const superTime = newTime.toString();
      localStorage.setItem('time' + id, superTime);
      setCounter((prev) => prev + 1);
    }, 1000);
    setIntervalId(idInt);
  }

  function timerShow() {
    const total: string = localStorage.getItem('time' + id) as string;
    let min;
    let second;
    second = Math.floor(+total % 60);
    min = Math.floor(+total / 60);

    second = second % 60 < 10 ? '0' + second : second;
    min = min % 60 < 10 ? min : min;
    return setTimer(min + ':' + second)
  }

  useEffect(() => timerShow(),[localStorage.getItem('time' + id)])

  let check = true;
  if (!done) {
    check = false;
  }

  return (
    <li className={'view'} id={id}>
      <div className={divView}>
        <input
          className="toggle"
          type="checkbox"
          onChange={boxCheck}
          checked={check}
          onClick={() => {
            clearInterval(intervalId);
            return onToggleActive(id);
          }}
        />
        <label>
          <div>
            <span className="description">{description}</span>
          </div>
          <div className={'timer__btn'}>
            <button className="icon-play" onClick={timer} />
            <button
              className="icon-pause"
              onClick={() => {
                clearInterval(intervalId);
              }}
            />
            <span className={'timer__time'}>{timerTime}</span>
          </div>
          {CreatingTimeForTask(date)}
        </label>
        <button className="icon icon-edit" onClick={() => onToggleEdit()} />
        <button
          className="icon icon-destroy"
          onClick={() => {
            localStorage.removeItem('time' + id);
            return onToggleLeft(id);
          }}
        />
      </div>
      <form onSubmit={onSubmit}>
        <input id="view" type="text" className={view} onChange={onLabelChange} value={nDescription} />
      </form>
    </li>
  );
}
