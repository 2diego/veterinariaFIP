import { Sucursal } from "../models/Sucursal";
import { VeterinariaFactory } from "../factories/VeterinariaFactory";
import { GeneradorID } from "../utils/GeneradorID";
import { solicitarDatos } from "../utils/capturar-datos";


export class SucursalRepository {
  private sucursales: Sucursal[];

  constructor() {
    this.sucursales = [];
  }  

  public getSucursales(): Sucursal[] {
    return this.sucursales;
  }

  public getSucursalPorId(id: string): Sucursal | undefined {
    return this.sucursales.find((sucursal) => sucursal.getId() === id);
  }

  public ingresarSucursal(): void {
    const sucursal: Sucursal = VeterinariaFactory.crear('sucursal');
    this.sucursales.push(sucursal);
    console.log(`\nSe agrego la sucursal de ${sucursal.getDireccion()} correctamente.`);
  }

  public eliminarSucursal(): void {
    if (this.getSucursales().length === 0) {
      console.log("\nNo existen sucursales.");
      return;
    } else {
        console.table(this.getSucursales());
        const sucursalId: string = solicitarDatos('id', ' de la sucursal a eliminar');
        if (this.getSucursalPorId(sucursalId)) {
          this.sucursales = this.sucursales.filter((sucursal) => sucursal.getId() !== sucursalId);
          GeneradorID.eliminarId(sucursalId);
          console.log(`\nSe elimino la sucursal con ID ${sucursalId} correctamente.`);
        } else {
            console.error(`\nError: La sucursal con ID ${sucursalId} no existe.`);
          }
      }
  }

  public editarSucursal(): void {
    if (this.getSucursales().length === 0) {
      console.log("\nNo existen sucursales.");
      return;
    } else {
        console.table(this.getSucursales());
        const sucursalId: string = solicitarDatos('id', ' de la sucursal a editar');
        const sucursal: Sucursal | undefined = this.getSucursalPorId(sucursalId);
        if (sucursal) {
          const propEditar: string = solicitarDatos('editar', ' de la sucursal:');
          switch (propEditar) {
            case "1":
              console.log("La opcion Editar Direccion no esta disponible para sucursales.");
              break;
            case "2":
              const nuevoTelefono: number = solicitarDatos('telefono', ' de la sucursal:');
              sucursal.setTelefono(nuevoTelefono);
              console.log(`\nSe edito el telefono de la sucursal con ID ${sucursalId} correctamente.`);
              break;
            case "3":
              const nuevaDireccion: string = solicitarDatos('direccion', ' de la sucursal:');
              sucursal.setDireccion(nuevaDireccion);
              console.log(`\nSe edito la direccion de la sucursal con ID ${sucursalId} correctamente.`);
              break;
          }
        } else {
            console.error(`\nError: La sucursal con ID ${sucursalId} no existe.`);
          }
      }
  }
}