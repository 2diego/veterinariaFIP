import { GeneradorID } from "../utils/GeneradorID";

export class Sucursal {
  private id: string;
  private direccion: string;
  private telefono: number;

  constructor(direccion: string, telefono: number) {
    this.id = GeneradorID.generarId();
    this.direccion = direccion;
    this.telefono = telefono;
  }

  //Getters
  getId(): string {
    return this.id;
  }
  getDireccion(): string {
    return this.direccion;
  }

  getTelefono(): number {
    return this.telefono;
  }

  //Setters
  setDireccion(nuevaDireccion: string) {
    this.direccion = nuevaDireccion;
  }

  setTelefono(nuevoTelefono: number) {
    this.telefono = nuevoTelefono;
  }
}
