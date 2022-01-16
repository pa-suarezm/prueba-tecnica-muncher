import React from 'react';
import useInputNumber from '../../../hooks/useInputNumber/useInputNumber';
import useInputText from '../../../hooks/useInputText/useInputText';
import styles from './FormProductos.module.css';

function FormProductos () {
  const { value: nombre, bind: bindNombre, reset: resetNombre } = useInputText('');
  const { value: descripcion, bind: bindDescripcion, reset: resetDescripcion } = useInputText('');
  const { value: precio, bind: bindPrecio, reset: resetPrecio } = useInputNumber(0);

  const handleSubmit = (evt: any) => {
    evt.preventDefault();
    alert(`Submitting Name ${nombre} ${descripcion} ${precio}`);
    resetNombre();
    resetDescripcion();
    resetPrecio();
  }

  return (
    <div className={styles.FormProductos}>
      <form onSubmit={handleSubmit}>
        <label>
          Nombre:&nbsp;
          <input type="text" {...bindNombre} />
        </label>
        <br />
        <label>
          Descripción:&nbsp;
          <input type="text" {...bindDescripcion} />
        </label>
        <br />
        <label>
          Precio:&nbsp;
          <input type="number" {...bindPrecio} />
        </label>
        <br />
        <input type="submit" value="Crear producto" />
      </form>
    </div>
  );
}

export default FormProductos;
