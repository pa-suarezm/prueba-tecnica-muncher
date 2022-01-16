import React from 'react';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import './App.css';
import Productos from './components/Productos/Productos';

function App() {
  const productos = atom({
    key: 'productos',
    default: [],
  });

  return (
    <RecoilRoot>
      <Productos />
    </RecoilRoot>
  );
}

export default App;
