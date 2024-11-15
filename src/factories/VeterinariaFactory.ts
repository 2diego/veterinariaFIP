import { Cliente } from "../models/Cliente";
import { Paciente } from "../models/Paciente";
import { Proveedor } from "../models/Proveedor";
import { Sucursal } from "../models/Sucursal";
import { solicitarDatos } from '../utils/capturar-datos';

export class VeterinariaFactory {

  public static crear(eleccion: "cliente" | "paciente" | "proveedor" | "sucursal"): any {
    switch (eleccion) {

      case "cliente":
        const datosCliente: { nombreCliente: string, telefonoCliente: number } = solicitarDatos('cliente');
        return new Cliente(datosCliente.nombreCliente, datosCliente.telefonoCliente);

      case 'paciente':
        const datosPaciente: { nombrePaciente: string, especie: "perro" | "gato" | "exotica", clienteId: string } = solicitarDatos('paciente');
        if (datosPaciente.especie !== "perro" && datosPaciente.especie !== "gato" && datosPaciente.especie !== "exotica") {
          console.error("Error: Tipo de mascota no valido. Por favor, ingrese 'perro', 'gato' o 'exotica'.");
          return undefined;
          }
        return new Paciente(datosPaciente.nombrePaciente, datosPaciente.especie, datosPaciente.clienteId)

      case 'proveedor':
        const datosProveedor: { nombreProveedor: string, telefonoProveedor: number } = solicitarDatos('proveedor');
        return new Proveedor(datosProveedor.nombreProveedor, datosProveedor.telefonoProveedor);

      case 'sucursal':
        const datosSucursal: { direccionSucursal: string, telefonoSucursal: number } = solicitarDatos('sucursal');
        return new Sucursal(datosSucursal.direccionSucursal, datosSucursal.telefonoSucursal);
    }
  }
}