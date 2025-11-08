import axios from 'axios';

// Simulación de API con datos locales
let productosCache = null;

export const obtenerProductos = async () => {
  try {
    const response = await axios.get('/productos.json');
    productosCache = response.data;
    return productosCache;
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

export const crearProducto = async (producto) => {
  // Simulación de creación (en producción esto sería una petición POST a una API real)
  try {
    if (!productosCache) {
      await obtenerProductos();
    }
    const nuevoId = Math.max(...productosCache.map(p => p.id)) + 1;
    const nuevoProducto = { ...producto, id: nuevoId };
    productosCache.push(nuevoProducto);
    return nuevoProducto;
  } catch (error) {
    console.error('Error al crear producto:', error);
    throw error;
  }
};

export const actualizarProducto = async (id, productoActualizado) => {
  // Simulación de actualización (en producción esto sería una petición PUT)
  try {
    if (!productosCache) {
      await obtenerProductos();
    }
    const index = productosCache.findIndex(p => p.id === id);
    if (index !== -1) {
      productosCache[index] = { ...productosCache[index], ...productoActualizado };
      return productosCache[index];
    }
    throw new Error('Producto no encontrado');
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    throw error;
  }
};

export const eliminarProducto = async (id) => {
  // Simulación de eliminación (en producción esto sería una petición DELETE)
  try {
    if (!productosCache) {
      await obtenerProductos();
    }
    const index = productosCache.findIndex(p => p.id === id);
    if (index !== -1) {
      productosCache.splice(index, 1);
      return true;
    }
    throw new Error('Producto no encontrado');
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    throw error;
  }
};

export const obtenerProductoPorId = async (id) => {
  try {
    if (!productosCache) {
      await obtenerProductos();
    }
    return productosCache.find(p => p.id === id);
  } catch (error) {
    console.error('Error al obtener producto:', error);
    throw error;
  }
};
