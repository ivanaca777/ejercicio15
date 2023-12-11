import React, { useState, useEffect } from 'react';
import Form from './Form';

const ProductList = ({ products, onEdit, onDelete }) => {

  const [editIndex, setEditIndex] = useState(null); // indice del producto por editar

  const [editedProduct, setEditedProduct] = useState({}); // producto por editar

  const handleEdit = (index) => { // toma ambos para editar
    setEditIndex(index);
    setEditedProduct(products[index]);
  };

  const handleCancelEdit = () => { // cancela la edición
    setEditIndex(null);
    setEditedProduct({});
  };

  const handleDelete = (index) => { // elimina el producto
    onDelete(index);
    handleCancelEdit();
  };

  const handleEditSubmit = (editedProduct) => { //guarda los cambios
    onEdit(editIndex, editedProduct);

    // actualiza el local storage
    const updatedProducts = [...products];
    updatedProducts[editIndex] = editedProduct;
    localStorage.setItem('products', JSON.stringify(updatedProducts));

    // limpia el estado
    setEditIndex(null);
    setEditedProduct({});
  };

  const renderProduct = (product, index) => {
    if (editIndex === index) {
      return (
        <div key={index} className="product">
          <Form
            onSubmit={(editedProduct) => handleEditSubmit(editedProduct)}
            selectedProduct={editedProduct}
          />
          <button onClick={handleCancelEdit}>Cancelar</button>
        </div>
      );
    }

    return (
      <div key={index} className="product">
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>Precio: ${product.price}</p>
        <div className="botones">
          <button onClick={() => handleEdit(index)}>Editar</button>
          <button onClick={() => handleDelete(index)}>Eliminar</button>
        </div>
      </div>
    );
  };

  return <main>{products.map((product, index) => renderProduct(product, index))}</main>;
};

export default ProductList;
