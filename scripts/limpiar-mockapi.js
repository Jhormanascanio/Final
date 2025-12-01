/**
 * Script para limpiar todos los productos de MockAPI
 * 
 * INSTRUCCIONES:
 * Ejecuta: node scripts/limpiar-mockapi.js
 */

import axios from 'axios';

const MOCKAPI_URL = 'https://691d0009d58e64bf0d34aae5.mockapi.io/api/v1/products';

async function limpiarProductos() {
  try {
    console.log('🧹 Obteniendo productos existentes...\n');
    
    const response = await axios.get(MOCKAPI_URL);
    const productos = response.data;
    
    console.log(`📦 Se encontraron ${productos.length} productos para eliminar\n`);
    
    let eliminados = 0;
    
    for (const producto of productos) {
      try {
        await axios.delete(`${MOCKAPI_URL}/${producto.id}`);
        eliminados++;
        console.log(`🗑️  [${eliminados}/${productos.length}] Eliminado: ${producto.nombre || producto.id}`);
        
        // Delay para no saturar la API
        await new Promise(resolve => setTimeout(resolve, 100));
      } catch (error) {
        console.error(`❌ Error al eliminar ${producto.id}:`, error.message);
      }
    }
    
    console.log('\n═══════════════════════════════════════');
    console.log('✨ LIMPIEZA COMPLETADA');
    console.log(`🗑️  Eliminados: ${eliminados}`);
    console.log('═══════════════════════════════════════\n');
    console.log('💡 Ahora ejecuta: node scripts/migrar-productos.js');
    
  } catch (error) {
    console.error('💥 Error crítico:', error.message);
  }
}

limpiarProductos();
