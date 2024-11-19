import { Proveedor } from "../models/Proveedor";
import { VeterinariaFactory } from "../factories/VeterinariaFactory";
import { GeneradorID } from "../utils/GeneradorID";
import { solicitarDatos } from "../utils/capturar-datos";

export class ProveedorRepository {
  private proveedores: Proveedor[];

  constructor() {
    this.proveedores = [];
  }

  public getProveedores(): Proveedor[] {
    return this.proveedores;
  }

  public getProveedorPorId(id: string): Proveedor | undefined {
    return this.proveedores.find((proveedor) => proveedor.getId() === id);
  }

  public ingresarProveedor(): void {
    const nuevoProveedor: Proveedor = VeterinariaFactory.crear('proveedor');
    this.proveedores.push(nuevoProveedor);
    console.log(`\nSe agrego el proveedor ${nuevoProveedor.getNombre()} correctamente.`);
  }

  public eliminarProveedor(): void {
    if (this.getProveedores().length === 0) {
      console.log("\nNo existen proveedores.");
      return;
    } else {
        console.table(this.getProveedores());
        const proveedorId: string = solicitarDatos('id', ' del proveedor a eliminar');
        if (this.getProveedorPorId(proveedorId)) {
          this.proveedores = this.proveedores.filter((proveedor) => proveedor.getId() !== proveedorId);
          GeneradorID.eliminarId(proveedorId);
          console.log(`\nSe elimino el proveedor con ID ${proveedorId} correctamente.`);
        } else {
            console.error(`\nError: El proveedor con ID ${proveedorId} no existe.`);
          } 
      }
  }

  public editarProveedor(): void {
    if (this.getProveedores().length === 0) {
      console.log("\nNo existen proveedores.");
      return;
    } else {
        console.table(this.getProveedores());
        const proveedorId: string = solicitarDatos('id', ' del proveedor a editar');
        const proveedor: Proveedor | undefined = this.getProveedorPorId(proveedorId);
        if (proveedor) {
          let editar: string = solicitarDatos('editar');
          switch (editar) {
            case '1':
              const nuevoNombre: string = solicitarDatos('nombre', ' del proveedor a editar:');
              proveedor.setNombre(nuevoNombre);
              console.log('Proveedor editado correctamente.');
              break;
            case '2':
              const nuevoTelefono: number = solicitarDatos('telefono', ' del proveedor a editar:');
              proveedor.setTelefono(nuevoTelefono);
              console.log('Proveedor editado correctamente.');
              break;
            case '3':
              console.log('La opcion Editar Direccion no esta disponible para proveedores.');
              break;
            default:
              console.error('Error: Opcion no valida');
              break;
          }
        } else {
          console.error(`Error: No existe el proveedor con ID ${proveedorId}.`);
        }
      }
  }
}