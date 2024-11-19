import * as readlineSync from 'readline-sync';
import { Veterinaria } from "../models/Veterinaria";
import { Paciente } from '../models/Paciente';

function verPacientesPorID(veterinaria: Veterinaria): void {
  if (veterinaria.getClientes().length === 0) {
    console.log("\nNo existen clientes.");
  } else {
    console.log(`\n======= Listado de clientes =======`);
    console.table(veterinaria.getClientes());
    veterinaria.getPacientesPorId();
  }
}

function verPacientes(veterinaria: Veterinaria): void {
  let mascotas: Paciente[] = veterinaria.getPacientes();
  if (mascotas.length === 0) {
    console.log("\nNo existen mascotas.");
  } else {
    console.log(`\n======= Listado de mascotas =======`);
    console.table(mascotas);
  }
}

export function menuPacientes(veterinaria: Veterinaria): void {
  let enPacientes = true;
  while (enPacientes) {
    console.log(`\n======= SECCION PACIENTES =======`);
    let nuevaAccion = readlineSync.question(`\nSeleccione que accion desea realizar:
        1. Ver pacientes por cliente
        2. Ver todos los pacientes
        3. Agregar paciente
        4. Editar paciente
        5. Eliminar paciente
        6. Volver al menu principal
\nSu eleccion: `);
    switch (nuevaAccion) {
      case "1":
        verPacientesPorID(veterinaria);
        break;
      case "2":
        verPacientes(veterinaria);
        break;
      case "3":
        veterinaria.ingresarPaciente()
        break;
      case "4":
        veterinaria.editar("paciente");
        break;
      case "5":
        veterinaria.eliminarPaciente();
        break;
      case "6":
        enPacientes = false;
        break;
      default:
        console.error("Error: Opcion no valida");
        break;
    }
  }
}



