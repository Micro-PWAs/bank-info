require('offline-plugin/runtime').install();
import { Component, h, render } from 'preact';
import App from './components/App';

const elem = document.querySelector('#app');
elem.innerHTML = '';

render(
  <App />,
  elem
);