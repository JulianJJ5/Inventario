<template>
  <div>
    <h1>Formulario de registro de datos para inventario</h1>
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" @click="abrirModal()">
      Agregar Producto
    </button>

    <!-- Modal -->
    <div class="modal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <label for="Nombre">Ingrese el nombre del producto: </label>
            <input type="text" placeholder="Nombre" v-model="nombre" id="Nombre"><br><br>

            <label for="Precio">Digite el precio: </label>
            <input type="number" placeholder="Precio" id="Precio" v-model="precio"><br><br>

            <label for="Costo">Digite el costo: </label>
            <input type="number" placeholder="Costo" v-model="costo"><br><br>

            <label for="Proveedor">Digite el nombre del proveedor: </label>
            <input type="text" id="Proveedor" placeholder="Proveedor" v-model="proveedor"><br><br>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button type="button" class="btn btn-primary" @click="agregarProducto()">Agregar</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Grilla de datos -->
    <h1>Grilla de datos</h1>
    <table class="table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Precio</th>
          <th>Costo</th>
          <th>Cantidad</th>
          <th>Proveedor</th>
          <th>Opciones</th>
          <th>Ganancia</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(producto, index) in productos" :key="index">
          <td>{{ producto.nombre }}</td>
          <td>{{ producto.precio }}</td>
          <td>{{ producto.costo }}</td>
          <td>{{ producto.cantidad }}</td>
          <td>{{ producto.proveedor }}</td>
          <td>
            <button @click="aumentarCantidad(producto)">➕</button>
            <button @click="disminuirCantidad(producto)">➖</button>
          </td>
          <td>{{ calcularGanancia(producto) }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Totales -->
    <div class="total">
      <h2>Costo total del inventario: {{ calcularCostoTotal() }}</h2>
      <h2>Precio total del inventario: {{ calcularPrecioTotal() }}</h2>
      <h2>Ganancia total: {{ calcularGananciaTotal() }}</h2>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

let nombre = ref("");
let precio = ref(0);
let costo = ref(0);
let proveedor = ref("");
let cantidad = ref(1);
let productos = ref([]);

function abrirModal() {
  new bootstrap.Modal(document.getElementById('exampleModal')).show();
}

function agregarProducto() {
  if (!nombre.value || precio.value < 0 || costo.value < 0 || cantidad.value < 0 || !proveedor.value) {
    alert("Por favor, complete todos los campos correctamente.");
    return;
  }

  productos.value.push({
    nombre: nombre.value,
    precio: precio.value,
    costo: costo.value,
    cantidad: cantidad.value,
    proveedor: proveedor.value
  });

  limpiarCampos();


}

function limpiarCampos() {
  nombre.value = "";
  precio.value = 0;
  costo.value = 0;
  proveedor.value = "";
}

function aumentarCantidad(producto) {
  producto.cantidad++;
}

function disminuirCantidad(producto) {
  if (producto.cantidad > 1) {
    producto.cantidad--;
  } else {
    const index = productos.value.findIndex((p) => p === producto);
    productos.value.splice(index, 1);
  }
}

function calcularGanancia(producto) {
  return (producto.precio * producto.cantidad) - (producto.costo * producto.cantidad);
}

function calcularCostoTotal() {
  return productos.value.reduce((total, producto) => total + producto.costo * producto.cantidad, 0);
}

function calcularPrecioTotal() {
  return productos.value.reduce((total, producto) => total + producto.precio * producto.cantidad, 0);
}

function calcularGananciaTotal() {
  return calcularPrecioTotal() - calcularCostoTotal();
}
</script>

<style>

  form {
    margin-bottom: 20px;
  }

  label {
    font-weight: bold;
    margin-right: 10px;
  }

  input[type="text"],
  input[type="number"] {
    padding: 5px;
    margin-bottom: 10px;
    width: 200px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  button {
    padding: 8px 15px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }


  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }

  th {
    background-color: #007bff;
    color: #fff;
    font-weight: bold;
  }

  tr:hover {
    background-color: #f5f5f5;
  }

  .total {
    margin-top: 20px;
    font-weight: bold;
  }
</style>
