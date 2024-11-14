import * as readlineSync from 'readline-sync';

export function solicitarDatos(eleccion: "cliente" | "paciente" | "proveedor" | "sucursal"): any {

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

    default:
      console.log("Opción no válida");
      return null;
  }
}
