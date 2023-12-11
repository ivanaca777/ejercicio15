import React, { useState, useEffect } from 'react';
import ProductList from './ProductList';
import './App.css';
import Form from './Form';

const App = () => {

  const [products, setProducts] = useState([]); // productos almacenados

  const [selectedProduct, setSelectedProduct] = useState(null); // producto en estado de edicion
  
  const [formProduct, setFormProduct] = useState({ //el formulario vacío por defecto
    name: '',
    description: '',
    price: '',
  });

  useEffect(() => { // busca en el local storage los datos y se los asigna "products"
    const fetchData = async () => {
      const data = JSON.parse(localStorage.getItem('products')) || [];
      setProducts(data);
    };
    fetchData();
  }, []);


  const handleSubmit = (product) => { //maneja el formulario
    if (selectedProduct) { //actualiza producto existente
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p.id === selectedProduct.id ? product : p))
      );
      setSelectedProduct(null);
    } else {  //agrega uno nuevo
      const updatedProducts = [...products, { ...product, id: Date.now() }];
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
    }

    setFormProduct({ name: '', description: '', price: '' }); //limpia el formulario
    window.location.reload();
  };

  const handleEdit = (index, editedProduct) => { // maneja la edición de los productos
    setProducts((prevProducts) => {
      const newProducts = [...prevProducts];
      newProducts[index] = editedProduct;
      return newProducts;
    });

    localStorage.setItem('products', JSON.stringify(products));
    setSelectedProduct(null);
  };

  const handleDelete = (index) => { //maneja el borrado de productos 
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
    localStorage.setItem('products', JSON.stringify(updatedProducts));
    setSelectedProduct(null);
  };

  return (  //imprime en pantalla
    <>
      <header>
        <h1>Control de Inventario</h1>
        <Form
          onSubmit={handleSubmit}
          selectedProduct={selectedProduct}
          formProduct={formProduct}
          setFormProduct={setFormProduct}
        />
        <ProductList classname="stock" products={products} onEdit={handleEdit} onDelete={handleDelete} />
      </header>
    </>
  );
};

export default App;