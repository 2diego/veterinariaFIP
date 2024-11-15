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

function editarProveedor(veterinaria: Veterinaria): void {
  if (veterinaria.getProveedores().length === 0) {
    console.log("\nNo existen proveedores.");
    return;
  } else {
      console.table(veterinaria.getProveedores());
      let proveedorId: string = readlineSync.question("Ingrese el ID del proveedor a editar: ");
      let proveedor: Proveedor | undefined = veterinaria.getProveedores().find((proveedor) => proveedor.getId() === proveedorId);
      if (proveedor) {
        let editar: string = readlineSync.question(`Seleccione que desea editar:
            1. Nombre
            2. Telefono
          \nSu eleccion: `);
        switch (editar) {
          case "1":
            let nuevoNombre: string = readlineSync.question("Ingrese el nuevo nombre del proveedor: ");
            proveedor.setNombre(nuevoNombre);
            console.log("Proveedor editado correctamente.");
            break;
          case "2":
            let nuevoTelefono: number = readlineSync.questionInt("Ingrese el nuevo telefono del proveedor: ");
            proveedor.setTelefono(nuevoTelefono);
            console.log("Proveedor editado correctamente.");
            break;
          default:
            console.error("Error: Opcion no valida");
            break;
        }
      } else {
        console.error(`Error: No existe el proveedor con ID ${proveedorId}.`);
      }
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
        editarProveedor(veterinaria);
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