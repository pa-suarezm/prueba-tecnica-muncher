/* eslint-disable eqeqeq */
import { collection, deleteDoc, doc, getDocs, getFirestore, updateDoc } from 'firebase/firestore/lite';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { atom, useRecoilState } from 'recoil';
import { app } from '../../../App';
import styles from './TablaProductos.module.css';
import NumberFormat from 'react-number-format';
import useInputText from '../../../hooks/useInputText/useInputText';
import useInputNumber from '../../../hooks/useInputNumber/useInputNumber';

const productosListState = atom({
  key: 'productos',
  default: [] as any[],
});

function TablaProductos () {
  const [productos, setProductos] = useRecoilState(productosListState);

  /** Variables para el manejo del modal de edición de producto */
  const [show, setShow] = useState(false);

  const [prodSeleccionado, setProdSeleccionado] = useState({key: '', nombre: '', descripcion: '', precio: 0, usuario: ''});
  
  const { value: nombre, set: setValueNombre, bind: bindNombre, reset: resetNombre } = useInputText('');
  const { value: descripcion, set: setValueDescripcion, bind: bindDescripcion, reset: resetDescripcion } = useInputText('');
  const { value: precio, set: setValuePrecio, bind: bindPrecio, reset: resetPrecio } = useInputNumber(0);

  const closeModal = () => setShow(false);
  const showModal = (event: any) => {
    resetNombre();
    resetDescripcion();
    resetPrecio();

    setProdSeleccionado(productos[findIndexOfProduct(event.target.id)]);

    setValueNombre(prodSeleccionado.nombre);
    setValueDescripcion(prodSeleccionado.descripcion);
    setValuePrecio(prodSeleccionado.precio);

    setShow(true);
  };

  useEffect(() => {
    setValueNombre(prodSeleccionado.nombre);
    setValueDescripcion(prodSeleccionado.descripcion);
    setValuePrecio(prodSeleccionado.precio);
  }, [show]);

  const handleSave = async () => {
    const updatedProd = {
      nombre: nombre,
      descripcion: descripcion,
      precio: precio
    };
    const db = getFirestore(app);
    const docRef = doc(db, 'productos', prodSeleccionado.key);
    try {
      await updateDoc(docRef, updatedProd);
    } catch (err) {
      console.log(err);
      alert('Ocurrió un error actualizando el producto, intenta de nuevo más tarde.');
      return;
    }
    const prods: any[] = productos.slice(0);
    prods[findIndexOfProduct(prodSeleccionado.key)] = {
      key: prodSeleccionado.key,
      nombre: nombre,
      descripcion: descripcion,
      precio: precio,
      usuario: prodSeleccionado.usuario
    };
    setProductos(prods);
    closeModal();
    alert('El producto fue editado con éxito.');
  }

  useEffect(() => {
    const getProducts = async () => {
      const db = getFirestore(app);
      const prodsCol = collection(db, 'productos');
      const querySnapshot = await getDocs(prodsCol);
      const new_prods: any[] = [];
      querySnapshot.forEach((doc: any) => {
        new_prods.push(
          {
            key: doc._document.key.path.segments[doc._document.key.path.segments.length - 1],
            nombre: doc._document.data.value.mapValue.fields.nombre.stringValue || 'No registra',
            descripcion: doc._document.data.value.mapValue.fields.descripcion.stringValue || 'No registra',
            precio: doc._document.data.value.mapValue.fields.precio.stringValue || 'No registra',
            usuario: doc._document.data.value.mapValue.fields.usuario?.stringValue || 'No registra'
          }
        );
      });
      setProductos(new_prods);
    };

    getProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteProduct = async (event: any) => {
    const db = getFirestore(app);
    const borrar: boolean = window.confirm('¿Está seguro de que desea eliminar el producto? No podrá deshacer esta acción.');
    if (borrar) {
      try {
        await deleteDoc(doc(db, 'productos', event.target.id));
      } catch (err) {
        console.log(err);
        alert('Ocurrió un error eliminando el producto. Por favor intente de nuevo más tarde.');
      }
      const indexDeleted = findIndexOfProduct(event.target.id);
      if (indexDeleted != -1) {
        const new_prods: any[] = productos.slice(0);
        new_prods.splice(indexDeleted, 1);
        setProductos(new_prods);
      }
      alert('El producto fue eliminado con éxito.');
    }
  }

  const findIndexOfProduct = (id: string): number => {
    let ans = -1;

    let  i = 0;
    for (const aux of productos) {
      if (aux.key == id) {
        ans = i;
        break;
      }
      i++;
    }

    return ans;
  }

  return (
    <>
      <div className={styles.TablaProductos}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>
                Nombre
              </th>
              <th>
                Descripción
              </th>
              <th>
                Precio
              </th>
              <th>
                Creado por
              </th>
              <th>
                ID
              </th>
              <th>
                Editar producto
              </th>
              <th>
                Borrar producto
              </th>
            </tr>
          </thead>
          <tbody>
            {
              productos.length !== 0 ?
                productos.map((e: any, i) => (
                  <tr key={e.nombre + i}>
                    <td>
                      {e.nombre}
                    </td>
                    <td>
                      {e.descripcion}
                    </td>
                    <td>
                      <NumberFormat thousandSeparator={true} prefix={'$'} value={e.precio} displayType="text" />
                    </td>
                    <td>
                      {e.usuario}
                    </td>
                    <td>
                      {e.key}
                    </td>
                    <td>
                      <Button id={e.key} variant="outline-info" onClick={showModal}>
                        Editar
                      </Button>
                    </td>
                    <td>
                      <Button id={e.key} variant="outline-danger" onClick={deleteProduct}>
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                  
                  )) : <tr><td colSpan={5}>No se encontraron datos. Agrega productos con el formulario de arriba.</td></tr>
            }
          </tbody>
        </Table>
      </div>
      <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Editar producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {prodSeleccionado.nombre}
          <Form>
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
              <Form.Control type="number" placeholder="e.g. 500" min="0" {...bindPrecio} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Guardar cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default TablaProductos;
