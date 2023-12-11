import React, { useState, useEffect } from 'react';

const Form = ({ onSubmit, selectedProduct }) => {
  const [formProduct, setFormProduct] = useState({  // formulario vacio para gestionar
    name: '',
    description: '',
    price: '',
  });

  useEffect(() => { // actualiza el formulario al editar un producto

    if (selectedProduct) {
      setFormProduct(selectedProduct);
    } else {

      // Limpia el formulario cuando no hay un producto seleccionado
      setFormProduct({
        name: '',
        description: '',
        price: '',
      });
    }
  }, [selectedProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // verifica campos incompletos
    if (!formProduct.name || !formProduct.description || !formProduct.price) {
      alert('Todos los campos son obligatorios');
      return;
    }

    // guarda en el localStorage
    const productToSave = { ...formProduct, id: Date.now() };
    const existingProducts = JSON.parse(localStorage.getItem('products')) || [];
    const updatedProducts = selectedProduct
      ? existingProducts.map((p) => (p.id === selectedProduct.id ? productToSave : p))
      : [...existingProducts, productToSave];

    localStorage.setItem('products', JSON.stringify(updatedProducts));

    onSubmit(productToSave);

    setFormProduct({ name: '', description: '', price: '' }); // limpia los valores
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{selectedProduct ? 'Modificar Producto' : 'Agregar Producto al Stock'}</h2>

      <label>
        Nombre:
        <input
          type="text"
          value={formProduct.name}
          onChange={(e) => setFormProduct({ ...formProduct, name: e.target.value })}
        />
      </label>


      <label>
        Descripción:
        <input
          type="text"
          value={formProduct.description}
          onChange={(e) => setFormProduct({ ...formProduct, description: e.target.value })}
        />
      </label>


      <label>
        Precio:
        <input
          type="number"
          value={formProduct.price}
          onChange={(e) => setFormProduct({ ...formProduct, price: e.target.value })}
        />
      </label>


      <button type="submit">{selectedProduct ? 'Modificar' : 'Agregar'}</button>
      
    </form>
  );
};

export default Form;
