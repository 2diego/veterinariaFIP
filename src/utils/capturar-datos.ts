import * as readlineSync from 'readline-sync';

export function solicitarDatos(eleccion: "cliente" | "paciente" | "proveedor" | "sucursal" | "editar" | "editarPaciente" | "nombre" | "telefono" | "id" | "especie" | "direccion", frase?: string): any {

  switch (eleccion) {
    case "cliente":
      const nombreCliente: string = readlineSync.question("Ingrese el nombre del cliente: ");
      const telefonoCliente: number = readlineSync.questionInt("Ingrese el telefono del cliente: ");
      return {nombreCliente, telefonoCliente};

    case "paciente":
      const nombrePaciente: string = readlineSync.question("Ingrese el nombre de la mascota: ");
      const especie: "perro" | "gato" | "exotica" = readlineSync.question("Ingrese el tipo de la mascota (perro, gato o exotica): ") as "perro" | "gato" | "exotica";
      const clienteId: string = readlineSync.question("Ingrese el ID del duenio de la mascota: ");
      return {nombrePaciente, especie, clienteId};

    case "proveedor":
      const nombreProveedor: string = readlineSync.question("Ingrese el nombre del proveedor: ");
      const telefonoProveedor: number = readlineSync.questionInt("Ingrese el telefono del proveedor: ");
      return {nombreProveedor, telefonoProveedor};

    case "sucursal":
      const direccionSucursal: string = readlineSync.question("Ingrese la direccion de la sucursal: ");
      const telefonoSucursal: number = readlineSync.questionInt("Ingrese el telefono de la sucursal: ");
      return {direccionSucursal, telefonoSucursal};

    case "editar":
    const propEditar: string = readlineSync.question(`Seleccione que desea editar:
      1. Nombre
      2. Telefono
      3. Direccion
    \nSu eleccion: `);
    return propEditar;

    case "editarPaciente":
      const propEditarPacientes: string = readlineSync.question(`Seleccione que desea editar:
        1. Nombre
        2. Especie
      \nSu eleccion: `);
      return propEditarPacientes;

    case "nombre":
      const nombre: string = readlineSync.question(`Ingrese el nombre${frase}: `);
      return nombre;

    case "telefono":
      const telefono: number = readlineSync.questionInt(`Ingrese el telefono${frase}: `);
      return telefono;

    case "id":
      const id: string = readlineSync.question(`Ingrese el ID${frase}: `);
      return id;

    case "especie":
      const nuevaEspecie: "perro" | "gato" | "exotica" = readlineSync.question(`Ingrese la especie de la mascota (perro, gato o exotica): `) as "perro" | "gato" | "exotica";
      return nuevaEspecie;

    case "direccion":
      const nuevaDireccion: string = readlineSync.question(`Ingrese la direccion${frase}: `);
      return nuevaDireccion;

    default:
      console.log("Opción no válida");
      return null;
  }
}
