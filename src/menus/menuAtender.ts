import * as readlineSync from 'readline-sync';
import { Veterinaria } from "../models/Veterinaria";
import { Cliente } from '../models/Cliente';

export function menuAtender(veterinaria: Veterinaria): void {
  console.log("ATENCION AL PUBLICO");
  let clienteId: number = readlineSync.questionInt(`\nIngrese el ID del cliente que desea atender: `);
  let nombreMascota: string = readlineSync.question("Ingrese el nombre de la mascota: ");
  let cliente: Cliente | undefined = veterinaria.getClientes().find((cliente) => cliente.getId() === clienteId);
  if (cliente) {
    if (veterinaria.getMascotas(clienteId).find((mascota) => mascota.getNombre() === nombreMascota)) {
      veterinaria.atender(clienteId);
      console.log(`La mascota ${nombreMascota} del cliente ${cliente.getNombre()} con ID ${clienteId} se encuentra en atención. `);
    } else {
      console.error(`Error: No existe la mascota con el nombre ${nombreMascota} del cliente ${cliente.getNombre()} con ID ${clienteId}.`);
      }
  } else {
    console.error(`Error: No existe el cliente con ID ${clienteId}.`);
    }
}