import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import './App.css';
import SignIn from './components/SignIn/SignIn';

function App() {
  return (
    <RecoilRoot>
      <SignIn />
    </RecoilRoot>
  );
}

export default App;
