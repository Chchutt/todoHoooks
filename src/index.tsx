import React from 'react';
import { createRoot } from 'react-dom/client';

import { TodoApp } from "./components/TodoApp";
import './index.css';

const Apps = (
    <TodoApp />
)


const rootElement = document.getElementById('root');

const root = createRoot(rootElement as HTMLElement);
root.render(Apps)
