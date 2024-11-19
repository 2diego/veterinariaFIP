import * as readlineSync from 'readline-sync';
import { Veterinaria } from "../models/Veterinaria";
import { Cliente } from '../models/Cliente';

function verClientes(veterinaria: Veterinaria): void {
  let clientes: Cliente[] = veterinaria.getClientes();
  if (clientes.length === 0) {
    console.log("\nNo existen clientes.");
  } else {
    console.log(`\n======= Listado de clientes =======`);
    console.table(clientes);
  }
}

function getPacientesPorId(veterinaria: Veterinaria): void {
  if (veterinaria.getClientes().length === 0) {
    console.log("\nNo existen clientes ni mascotas.");
  } else {
    console.table(veterinaria.getClientes());
    veterinaria.getPacientesPorId(); 
  }
}

export function menuClientes(veterinaria: Veterinaria): void {
  let enClientes = true;
  while (enClientes) {
    console.log(`\n======= SECCION CLIENTES =======`);
    let nuevaAccion = readlineSync.question(`\nSeleccione que accion desea realizar:
      1. Ver clientes
      2. Ver mascotas de un cliente
      3. Agregar cliente
      4. Modificar telefono
      5. Eliminar cliente
      6. Volver al menu principal
\nSu eleccion: `);
    switch (nuevaAccion) {
      case "1":
        verClientes(veterinaria);
        break;
      case "2":
        getPacientesPorId(veterinaria);
        break;
      case "3":
        veterinaria.ingresarCliente();
        break;
      case "4":
        veterinaria.editar("cliente");
        break;
      case "5":
        veterinaria.eliminarCliente();
        break;
      case "6":
        enClientes = false;
        break;
      default:
        console.error("Error: Opcion no valida");
        break;
    }
  }
}
