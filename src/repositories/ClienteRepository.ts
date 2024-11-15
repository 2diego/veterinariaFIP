import { Cliente } from "../models/Cliente";
import { Paciente } from "../models/Paciente";
import { VeterinariaFactory } from "../factories/VeterinariaFactory";
import { GeneradorID } from "../app/GeneradorID";
import { solicitarDatos } from "../app/CapturarDatos";

export class ClienteRepository {
  private clientes: Cliente[] = [];
  private pacientes: Paciente[] = [];

//Getters
  public getClientes(): Array<Cliente> {
    return this.clientes;
  }

  public getPacientes(): Array<Paciente> {
    //this.pacienteRepo.getPacientes();
    return this.pacientes;
  }

  public getClientePorId(clienteId: string): Cliente | undefined {
    return this.clientes.find(cliente => cliente.getId() === clienteId);
  }

  public getPacientesPorId(): Paciente[] | undefined {
    const clienteId: string = solicitarDatos('id', ' del cliente:');
    let cliente: Cliente | undefined = this.getClientePorId(clienteId);
    if (cliente) {
      let mascotas: Paciente[] = this.getPacientes().filter((mascota) => mascota.getId() === clienteId);
      if (mascotas.length > 0) {
        console.log(`\nLas mascotas del cliente ${cliente.getNombre()} con ID ${clienteId} son:`);
        console.table(mascotas)
        return;
      } else {
          console.error(`Error: No existen mascotas del cliente con ID ${clienteId}.`);
          return;
        }
    } else {
      console.error(`Error: El cliente con ID ${clienteId} no existe.`);
      return;
      }
  }

//Metodos add
  public ingresarCliente(): void {
    const nuevoCliente : Cliente = VeterinariaFactory.crear('cliente');
    this.clientes.push(nuevoCliente);
    console.log(`\nSe agrego el cliente ${nuevoCliente.getNombre()} correctamente.`); 
  }

  public ingresarPaciente(): void {
    //this.pacienteRepo.ingresarPaciente();
    console.table(this.getClientes());
    let nuevoPaciente: Paciente | undefined = VeterinariaFactory.crear('paciente');
    if (nuevoPaciente === undefined) {
      return;
    } else if (!this.getClientePorId(nuevoPaciente.getId())) {
        console.error(`\nError: No existe el duenio de ${nuevoPaciente.getNombre()}.`);
      } else {
        this.pacientes.push(nuevoPaciente);
        console.log(`\nSe agrego el paciente ${nuevoPaciente.getNombre()} correctamente.`);
      } 
  }

//Metodos delete
  public eliminarCliente(): void {
    console.table(this.getClientes());
    const clienteId: string = solicitarDatos('id', ' del cliente a eliminar');
    if (this.getClientePorId(clienteId)) {
      this.clientes = this.clientes.filter(cliente => cliente.getId() !== clienteId);
      this.pacientes = this.pacientes.filter((mascota) => mascota.getId() !== clienteId);
      GeneradorID.eliminarId(clienteId);
      console.log(`\nSe elimino el cliente con ID ${clienteId} y sus mascotas correctamente.`);
    } else {
      console.error(`\nError: El cliente con ID ${clienteId} no existe.`);
    }
  }

  public eliminarPaciente(): void {
    //this.pacienteRepo.eliminarPaciente();
    console.table(this.getPacientes());
    const pacienteId: string = solicitarDatos('id', ' del paciente a eliminar');
    const pacienteNombre: string = solicitarDatos('nombre', ' del paciente a eliminar');
    const paciente: Paciente | undefined = this.getPacientes().find(paciente => paciente.getId() === pacienteId)
    if (paciente && paciente.getNombre() === pacienteNombre) {
      this.pacientes = this.pacientes.filter((p) => !(p.getId() === pacienteId && p.getNombre() === pacienteNombre));
      console.log(`\nSe elimino el paciente ${pacienteNombre} con ID ${pacienteId} correctamente.`);
    } else {
      console.error(`\nError: El paciente ${pacienteNombre} con ID ${pacienteId} no existe.`);
    }
  }

//Metodos edit
  public editarCliente(): void {
    console.table(this.getClientes());
    const clienteId: string = solicitarDatos('id', ' del cliente a editar');
    const cliente: Cliente | undefined = this.getClientePorId(clienteId);
    if (cliente) {
      let editar: string = solicitarDatos('editar');
      switch (editar) {
        case "1":
          const nombre: string = solicitarDatos('nombre', ' del cliente');
          cliente.setNombre(nombre);
          console.log(`\nSe edito el nombre del cliente con ID ${clienteId} a ${cliente.getNombre()} correctamente.`); 
          break;
        case "2":
          const telefono: number = solicitarDatos('telefono', ' del cliente');
          cliente.setTelefono(telefono);
          console.log(`\nSe edito el telefono del cliente ${cliente.getNombre()} (ID ${clienteId}) a ${cliente.getTelefono()} correctamente.`); 
          break;
        case "3":
          console.log("No se puede editar la direccion del cliente.");
          break;
        default:
          console.error(`\nError: No se pudo editar el cliente con ID ${clienteId}.`);
          break;
      } 
    }
  }

  /*public editarPaciente(): void {
    this.pacienteRepo.editarPaciente();
  }*/

  public atenderCliente(): void {
    console.table(this.getClientes());
    const clienteId: string = solicitarDatos('id', ' del cliente:')
    const cliente: Cliente | undefined = this.getClientePorId(clienteId);
    if (cliente) {
      const nombreMascota: string = solicitarDatos('nombre', ' de la mascota:');
      const mascota: Paciente | undefined = this.getPacientes().find((mascota) => mascota.getNombre() === nombreMascota);
      if (!mascota) {
        console.error(`Error: No existe la mascota con el nombre ${nombreMascota} del cliente con ID ${clienteId}.`);
      } else {
          cliente.setVisitas();
          console.log(`Se atendio al cliente ${cliente.getNombre()}. Total visitas: ${cliente.getVisitas()}`);
        }
    } else {
      console.error(`Error: No existe el cliente con ID ${clienteId}.`);
    }
  };
}
