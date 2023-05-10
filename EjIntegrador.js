/*
En el archivo tarea2.js podemos encontrar un código de un supermercado que vende productos.
El código contiene 
    - una clase Producto que representa un producto que vende el super
    - una clase Carrito que representa el carrito de compras de un cliente
    - una clase ProductoEnCarrito que representa un producto que se agrego al carrito
    - una función findProductBySku que simula una base de datos y busca un producto por su sku
El código tiene errores y varias cosas para mejorar / agregar
​
Ejercicios
1) Arreglar errores existentes en el código
    a) Al ejecutar agregarProducto 2 veces con los mismos valores debería agregar 1 solo producto con la suma de las cantidades.    
    b) Al ejecutar agregarProducto debería actualizar la lista de categorías solamente si la categoría no estaba en la lista.
    c) Si intento agregar un producto que no existe debería mostrar un mensaje de error.
​
2) Agregar la función eliminarProducto a la clase Carrito
    a) La función eliminarProducto recibe un sku y una cantidad (debe devolver una promesa)
    b) Si la cantidad es menor a la cantidad de ese producto en el carrito, se debe restar esa cantidad al producto
    c) Si la cantidad es mayor o igual a la cantidad de ese producto en el carrito, se debe eliminar el producto del carrito
    d) Si el producto no existe en el carrito, se debe mostrar un mensaje de error
    e) La función debe retornar una promesa
​
3) Utilizar la función eliminarProducto utilizando .then() y .catch()
​
*/

class Producto {
    sku;            
    nombre;         
    categoria;      
    precio;         
    stock;          

    constructor(sku, nombre, precio, categoria, stock) {
        this.sku = sku;
        this.nombre = nombre;
        this.categoria = categoria;
        this.precio = precio;

        if (stock) {
            this.stock = stock;
        } else {
            this.stock = 10;
        }
    }

}


const queso = new Producto('KS944RUR', 'Queso', 10, 'lacteos', 4);
const gaseosa = new Producto('FN312PPE', 'Gaseosa', 5, 'bebidas');
const cerveza = new Producto('PV332MJ', 'Cerveza', 20, 'bebidas');
const arroz = new Producto('XX92LKI', 'Arroz', 7, 'alimentos', 20);
const fideos = new Producto('UI999TY', 'Fideos', 5, 'alimentos');
const lavandina = new Producto('RT324GD', 'Lavandina', 9, 'limpieza');
const shampoo = new Producto('OL883YE', 'Shampoo', 3, 'higiene', 50);
const jabon = new Producto('WE328NJ', 'Jabon', 4, 'higiene', 3);
const remera = new Producto ('SS555BV', 'Remera', 400, 'indumentaria', 100);


const productosDelSuper = [queso, gaseosa, cerveza, arroz, fideos, lavandina, shampoo, jabon, remera];


class Carrito {
    productos;      
    categorias;     
    precioTotal;    

    
    constructor() {
        this.precioTotal = 0;
        this.productos = [];
        this.categorias = [];
    }

     eliminarProducto(sku, cantidad) {
        return new Promise((resolve, reject) => {
          const productoEnCarrito = this.productos.find((producto) => producto.sku === sku);
      
          if  (productoEnCarrito === undefined) {
            reject("El producto no se encontro en el carrito");
          } else {
            if (cantidad < productoEnCarrito.cantidad) {
              productoEnCarrito.cantidad -= cantidad;
              resolve("Se elimino del carrito una cantidad del producto ");
            } else {
              const index = this.productos.indexOf(productoEnCarrito);
              this.productos.filter(index, 1);
              resolve("Se ha elimino el producto del carrito");
            }
          }
        })
      }

    async agregarProducto(sku, cantidad) {
        console.log(`Agregando ${cantidad} ${sku}`);

        try {

        const producto = await findProductBySku(sku);

        console.log("Producto encontrado", producto);

        const categoriaIndex = this.categorias.indexOf(producto.categoria);

        if (categoriaIndex >= 0) {  
        } else {
          this.categorias.push(producto.categoria);
        }
       

     const productoEnCarrito = this.productos.find(articulo => articulo.sku === sku);
     
        if (productoEnCarrito) {
        productoEnCarrito.cantidad += cantidad;
    
        } else {

        const nuevoProducto = new ProductoEnCarrito(sku, producto.nombre, cantidad);
        this.productos.push(nuevoProducto);
        this.categorias.push(producto.categoria);
        this.precioTotal += (producto.precio * cantidad);
}

} catch (error) {
    console.error(error);
    console.log("No se encontro el producto");
}
    }
}

class ProductoEnCarrito {
    sku;       
    nombre;    
    cantidad;  

    constructor(sku, nombre, cantidad) {
        this.sku = sku;
        this.nombre = nombre;
        this.cantidad = cantidad;
    }

}

function findProductBySku(sku) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const foundProduct = productosDelSuper.find(product => product.sku === sku);
            if (foundProduct) {
                resolve(foundProduct);
            } else {
                reject(`Product ${sku} not found`);
            }
        }, 1500);
    });
}

const carrito = new Carrito();
carrito.agregarProducto('WE328NJ', 2);
carrito.agregarProducto('WE328NJ', 2);//Prueba agregando otro producto igual para la suma de cantidades 1)a
carrito.agregarProducto('OL883YE', 50);// Prueba para comprobar categorias 1)b
carrito.agregarProducto('XX92LKI', 20);
carrito.agregarProducto('SS555BV',100);// Prueba para comprobar categorias 1)b
carrito.agregarProducto('SW587RR', 1); //Prueba producto inexistente 1)c
console.log(carrito.productos);
console.log(carrito.categorias); //Prueba para comprobar categorias 1)b

carrito.eliminarProducto("QQ547DD", 5)
  .then((mensaje) => console.log(mensaje))// Prueba para comprobar que el producto no existe 2)d
  .catch((error) => console.log(error)); //Prueba para comprobar que el producto no existe 2)d
