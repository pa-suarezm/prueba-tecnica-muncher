import React from 'react';
import FormProductos from './FormProductos/FormProductos';
import styles from './Productos.module.css';
import TablaProductos from './TablaProductos/TablaProductos';

function Productos() {
  return(
    <div className={styles.Productos}>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12">
            <h2>
              Productos
            </h2>
          </div>
        </div>
        <br />
        <div className="row">
          <div className="col-md-6 col-sm-12">
            <FormProductos />
          </div>
        </div>
        <br />
        <div className='row'>
          <div className='col-12'>
            <TablaProductos />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Productos;
