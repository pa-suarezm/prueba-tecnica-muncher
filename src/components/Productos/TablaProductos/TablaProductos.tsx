import { collection, getDocs, getFirestore } from 'firebase/firestore/lite';
import React, { useEffect } from 'react';
import { Table } from 'react-bootstrap';
import { atom, useRecoilState, useRecoilValue } from 'recoil';
import { app } from '../../../App';
import styles from './TablaProductos.module.css';

const productosListState = atom({
  key: 'productos',
  default: [] as any[],
});

function TablaProductos () {
  const [productos, setProductos] = useRecoilState(productosListState);

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
  }, []);

  return (
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
                    {e.precio}
                  </td>
                  <td>
                    {e.usuario}
                  </td>
                </tr>
                
                )) : <tr><td colSpan={4}>No se encontraron datos. Agrega productos con el formulario de arriba.</td></tr>
          }
        </tbody>
      </Table>
    </div>
  );
}

export default TablaProductos;
