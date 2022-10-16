import React from 'react';
import { Iitems } from '../../models';
import './index.css';
interface IFooter {
  count: number;
  activeCount: number;
  filterTask: (filter: string) => void;
  todoData: Iitems[];
}

export function Footer({ count, activeCount, filterTask }: IFooter): React.ReactElement {
  return (
    <footer className="footer">
      <span className="todo-count">{`${activeCount} items left, ${count} items active`}</span>
      <ul className="filters">
        <li>
          <button className="all" onClick={(e) => filterTask((e.target as HTMLTextAreaElement).className)}>
            All
          </button>
        </li>
        <li>
          <button className="active" onClick={(e) => filterTask((e.target as HTMLTextAreaElement).className)}>
            Active
          </button>
        </li>
        <li>
          <button className="completed" onClick={(e) => filterTask((e.target as HTMLTextAreaElement).className)}>
            Completed
          </button>
        </li>
      </ul>
      <button className="clear-completed" onClick={() => filterTask('clear')}>
        Clear completed
      </button>
    </footer>
  );
}
