import { Cliente } from "./Cliente";
import { Paciente } from "./Paciente";
import { Proveedor } from "./Proveedor";
import { Sucursal } from "./Sucursal";
import { GeneradorID } from "../utils/GeneradorID";
import { ClienteRepository } from '../repositories/ClienteRepository';
import { SucursalRepository } from '../repositories/SucursalRepository';
import { ProveedorRepository } from '../repositories/ProveedorRepository';

export class Veterinaria {
  private nombre: string;
  private direccion: string;
  private id: string;
  private sucursalRepo: SucursalRepository;
  private clienteRepo: ClienteRepository;
  private provRepo: ProveedorRepository;

  constructor(nuevoNombre: string, nuevaDireccion: string) {
    this.id = GeneradorID.generarId();
    this.nombre = nuevoNombre;
    this.direccion = nuevaDireccion;
    this.sucursalRepo = new SucursalRepository();
    this.clienteRepo = new ClienteRepository();
    this.provRepo = new ProveedorRepository();
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
    return this.provRepo.getProveedores();
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
    this.provRepo.ingresarProveedor();
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
    this.provRepo.eliminarProveedor();
  }

  public eliminarCliente(): void {
    this.clienteRepo.eliminarCliente();
  }

  public eliminarPaciente(): void {
    this.clienteRepo.eliminarPaciente();
  }

  public editar(propiedad: string): void {
    switch (propiedad) {
      case "cliente":
        this.clienteRepo.editarCliente();
        break;
      case "sucursal":
        this.sucursalRepo.editarSucursal();
        break;
      case "proveedor":
        this.provRepo.editarProveedor();
        break;
      case "paciente":
        this.clienteRepo.editarPaciente();
        break;
      default:
        console.error("Error: Opcion no valida");
        break;
    }
  } 

  public atender(): void {
    this.clienteRepo.atenderCliente();
  }

}