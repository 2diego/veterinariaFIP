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

  //public editarProveedor(): void {}

}