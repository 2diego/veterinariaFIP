import * as readlineSync from 'readline-sync';
import { Sucursal } from '../models/Sucursal';
import { Veterinaria } from '../models/Veterinaria';

function verSucursales(veterinaria: Veterinaria): void {
  let sucursales: Sucursal[] = veterinaria.getSucursales();
  if (sucursales.length === 0) {
    console.log("\nNo existen sucursales.");
  } else {
    console.log(`\n======= Listado de sucursales =======`);
    console.table(sucursales);
  }
}

export function menuSucursal(veterinaria: Veterinaria): void {

  let enSucursales = true;
  while (enSucursales) {
    console.log(`\n======= SECCION SUCURSALES =======`);
    let nuevaAccion = readlineSync.question(`\nSeleccione que accion desea realizar:
      1. Ver sucursales
      2. Agregar sucursal
      3. Editar sucursal
      4. Eliminar sucursal
      5. Volver al menu principal
\nSu eleccion: `);
    switch (nuevaAccion) {
      case "1":
        verSucursales(veterinaria);
        break;
      case "2":
        veterinaria.ingresarSucursal();
        break;
      case "3":
        veterinaria.editar("sucursal");
        break;
      case "4":
        veterinaria.eliminarSucursal();
        break;
      case "5":
        enSucursales = false;
        break;
      default:
        console.error("Error: Opcion no valida");
        break;
    }
  }
}