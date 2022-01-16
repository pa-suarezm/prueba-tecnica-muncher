import React from 'react';
import ReactDOM from 'react-dom';
import FormProductos from './FormProductos';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<FormProductos />, div);
  ReactDOM.unmountComponentAtNode(div);
});