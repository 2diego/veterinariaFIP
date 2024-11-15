import * as readlineSync from 'readline-sync';
import { Cliente } from "./Cliente";
import { Paciente } from "./Paciente";
import { Proveedor } from "./Proveedor";
import { Sucursal } from "./Sucursal";
import { GeneradorID } from "../utils/GeneradorID";
import { VeterinariaFactory } from '../factories/VeterinariaFactory';
import { ClienteRepository } from '../repositories/ClienteRepository';
import { SucursalRepository } from '../repositories/SucursalRepository';

export class Veterinaria {
  private nombre: string;
  private direccion: string;
  private id: string;
  private sucursalRepo: SucursalRepository;
  private clienteRepo: ClienteRepository;
  private proveedores: Array<Proveedor>;

  constructor(nuevoNombre: string, nuevaDireccion: string) {
    this.id = GeneradorID.generarId();
    this.nombre = nuevoNombre;
    this.direccion = nuevaDireccion;
    this.sucursalRepo = new SucursalRepository();
    this.clienteRepo = new ClienteRepository();
    this.proveedores = [];
  }  

  //Getters
  public getId(): string {
    return this.id;
  }
  public getNombre(): string {
    return this.nombre;
  } 
  public getDireccion(): string {    
    return this.direccion;  
  }
  public getSucursales(): Array<Sucursal> {
    return this.sucursalRepo.getSucursales();
  }
  public getProveedores(): Array<Proveedor> {
    return this.proveedores;
  }

  public getClientes(): Array<Cliente> {
    return this.clienteRepo.getClientes();
  }

  public getPacientes(): Array<Paciente> {
    return this.clienteRepo.getPacientes();
  }

  public getPacientesPorId(): Paciente[] | undefined {
    return this.clienteRepo.getPacientesPorCliente();
  }

  //Setters
  public setNombre(nuevoNombre: string): void {
    this.nombre = nuevoNombre;
  }
  public setDireccion(nuevaDireccion: string): void {
    this.direccion = nuevaDireccion;
  }

  //Metodos add
  public ingresarSucursal(): void {
    this.sucursalRepo.ingresarSucursal();
  }

  public ingresarProveedor(): void {
    const nuevoProveedor: Proveedor = VeterinariaFactory.crear('proveedor');
    this.proveedores.push(nuevoProveedor);
    console.log(`\nSe agrego el proveedor ${nuevoProveedor.getNombre()} correctamente.`);
  }


  public ingresarCliente(): void {
    this.clienteRepo.ingresarCliente();
  }

  public ingresarPaciente(): void {
    this.clienteRepo.ingresarPaciente();    
  }

  //Metodos delete
  public eliminarSucursal(): void {
    this.sucursalRepo.eliminarSucursal();
  }

  public eliminarProveedor(): void {
    if (this.getProveedores().length === 0) {
      console.log("\nNo existen proveedores.");
      return;
    } else {
        console.table(this.getProveedores());
        const proveedorId = readlineSync.question("Ingrese el id del proveedor: ");
        if (this.verificarProveedor(proveedorId)) {
          this.proveedores = this.proveedores.filter((proveedor) => proveedor.getId() !== proveedorId);
          GeneradorID.eliminarId(proveedorId);
          console.log(`\nSe elimino el proveedor con ID ${proveedorId} correctamente.`);
        } else {
            console.error(`\nError: El proveedor con ID ${proveedorId} no existe.`);
          } 
      }
  }

  public eliminarCliente(): void {
    this.clienteRepo.eliminarCliente();
  }

  public eliminarPaciente(): void {
    this.clienteRepo.eliminarPaciente();
  }

  public atender(): void {
    this.clienteRepo.atenderCliente();
  }

  //Metodos internos
  private verificarProveedor(proveedorId: string): Proveedor | undefined {
    const proveedor: Proveedor | undefined = this.proveedores.find((proveedor) => proveedor.getId() === proveedorId);
    if (proveedor) {
      return proveedor;
    } else {
      `Error: No existe el proveedor con ID ${proveedorId}.`;
    }
  }

}