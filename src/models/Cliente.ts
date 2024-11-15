import { GeneradorID } from "../utils/GeneradorID";

export class Cliente {
  private id: string;
  private nombre: string;
  private telefono: number;
  private esVip: boolean = false;
  private visitas: number = 0;

  constructor(nuevoNombre: string, nuevoTelefono: number) {
    this.id = GeneradorID.generarId();
    this.nombre = nuevoNombre;
    this.telefono = nuevoTelefono;
  }

  //Getters
  public getId(): string {
    return this.id;
  }
  public getNombre(): string {
    return this.nombre;
  }
  public getTelefono(): number {
    return this.telefono;
  } 
  public getEsVip(): boolean {
    return this.esVip;
  }
  public getVisitas(): number {
    return this.visitas;
  }

  //Setters
  public setNombre(nuevoNombre: string): void {
    this.nombre = nuevoNombre;
  }
  public setTelefono(nuevoTelefono: number): void {
    this.telefono = nuevoTelefono;
  }
  public setEsVip(): void {  
    this.esVip = true;
  }
  public setVisitas(): void {
    this.visitas++;
    if (this.visitas >= 5) {
      this.setEsVip();
    }
  }
}