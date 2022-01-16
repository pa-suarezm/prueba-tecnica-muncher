import React from 'react';
import FormProductos from './FormProductos/FormProductos';
import styles from './Productos.module.css';

function Productos() {

  return(
    <div className={styles.Productos}>
      <FormProductos />
    </div>
  );
}

export default Productos;
