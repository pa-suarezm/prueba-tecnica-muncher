import React from 'react';
import { atom, useRecoilState } from 'recoil';
import { app } from '../../../App';
import { getFirestore, collection, addDoc } from 'firebase/firestore/lite';
import useInputNumber from '../../../hooks/useInputNumber/useInputNumber';
import useInputText from '../../../hooks/useInputText/useInputText';
import styles from './FormProductos.module.css';
import { Button, Form } from 'react-bootstrap';

const productosListState = atom({
  key: 'productos',
  default: [] as any[],
});

function FormProductos () {
  const [productos, setProductos] = useRecoilState(productosListState);

  const { value: nombre, bind: bindNombre, reset: resetNombre } = useInputText('');
  const { value: descripcion, bind: bindDescripcion, reset: resetDescripcion } = useInputText('');
  const { value: precio, bind: bindPrecio, reset: resetPrecio } = useInputNumber(0);

  const uploadProducto = async (prod: any) => {
    const db = getFirestore(app);
    const prodsCol = collection(db, 'productos');
    try {
      const resp_doc: any = await addDoc(prodsCol, prod);
      prod['key'] = resp_doc._key.path.segments[resp_doc._key.path.segments.length - 1] //El id del documento creado en Firebase
      setProductos(
        [
          ...productos,
          prod
        ]
      );
      alert(`Se agregó el producto '${prod.nombre}' con éxito.`);
    } catch (err) {
      console.log(err);
      alert(`Ocurrió un error agregando el producto. Por favor intente de nuevo más tarde.`);
    }
  };

  const handleSubmit = (evt: any) => {
    evt.preventDefault();

    uploadProducto({
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      usuario: 'No registra'
    });

    resetNombre();
    resetDescripcion();
    resetPrecio();
  }

  return (
    <div className={styles.FormProductos}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control type="text" placeholder="e.g. Manzanas" {...bindNombre} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control type="text" placeholder="e.g. Deliciosas manzanas rojas nacionales" {...bindDescripcion} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control type="number" placeholder="e.g. 500" {...bindPrecio} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Crear producto
        </Button>
      </Form>
    </div>
  );
}

export default FormProductos;
