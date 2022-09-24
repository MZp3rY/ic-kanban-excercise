import ReactDOM from 'react-dom';
import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Popper from '@popperjs/core';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style/style.scss';
import {BrowserRouter as Router} from 'react-router-dom';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Router>
    <App />
  </Router>
);
