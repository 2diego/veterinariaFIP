import * as readlineSync from "readline-sync";
import { Veterinaria } from "../models/Veterinaria";
import { Proveedor } from "../models/Proveedor";


function verProveedores(veterinaria: Veterinaria): void {
  let proveedores: Proveedor[] = veterinaria.getProveedores();
  if (proveedores.length === 0) {
    console.log("\nNo existen proveedores.");
  } else {
    console.log(`\n======= Listado de proveedores =======`);
    console.table(proveedores);
  }
}

export function menuProveedor(veterinaria: Veterinaria): void {
  let enProveedores = true;
  while (enProveedores) {
    console.log(`\n======= SECCION PROVEEDORES =======`);
    let nuevaAccion = readlineSync.question(`\nSeleccione que accion desea realizar:
        1. Ver proveedores
        2. Agregar proveedor
        3. Editar proveedor
        4. Eliminar proveedor
        5. Volver al menu principal
\nSu eleccion: `);
    switch (nuevaAccion) {
      case "1":
        verProveedores(veterinaria);
        break;
      case "2":
        veterinaria.ingresarProveedor();
        break;
      case "3":
        veterinaria.editar("proveedor");
        break;
      case "4":
        veterinaria.eliminarProveedor();
        break;
      case "5":
        enProveedores = false;
        break;
      default:
        console.error("Error: Opcion no valida");
        break;
    }
  }
}