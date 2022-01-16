import React from 'react';
import { atom, useRecoilValue } from 'recoil';
import styles from './TablaProductos.module.css';

const productosListState = atom({
  key: 'productos',
  default: [] as any[],
});

async function getProducts() {
  
}

function TablaProductos () {
  const productos = useRecoilValue(productosListState);

  return (
    <div className={styles.TablaProductos}>
      {
        productos.map((e: any, i) => <p key={i}>{e.nombre} - {e.descripcion} - {e.precio}</p>)
      }
    </div>
  );
}

export default TablaProductos;
