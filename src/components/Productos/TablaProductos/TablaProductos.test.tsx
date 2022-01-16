import React from 'react';
import ReactDOM from 'react-dom';
import TablaProductos from './TablaProductos';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TablaProductos />, div);
  ReactDOM.unmountComponentAtNode(div);
});