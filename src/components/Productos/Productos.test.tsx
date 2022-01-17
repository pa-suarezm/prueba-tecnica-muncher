import React from 'react';
import ReactDOM from 'react-dom';
import Productos from './Productos';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Productos />, div);
  ReactDOM.unmountComponentAtNode(div);
});