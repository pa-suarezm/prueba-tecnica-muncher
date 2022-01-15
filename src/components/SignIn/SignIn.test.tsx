import React from 'react';
import ReactDOM from 'react-dom';
import SignIn from './SignIn';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<SignIn />, div);
  ReactDOM.unmountComponentAtNode(div);
});