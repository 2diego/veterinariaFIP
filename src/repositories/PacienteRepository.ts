import { Paciente } from "../models/Paciente";
import { solicitarDatos } from "../utils/capturar-datos";

export class PacienteRepository {
  private pacientes: Paciente[];

  constructor() {
    this.pacientes = [];
  }

  public getPacientes(): Paciente[] {
    return this.pacientes;
  }

  public filterPacientes(id: string, nombre?: string, equal: boolean = false): Paciente [] {
    let pacientesFiltrados = this.pacientes.filter((p) => {
      const matchId = p.getId() === id;
      const matchName = nombre ? p.getNombre() === nombre : true;
      return equal ? matchId && matchName : !(matchId && matchName);
    });
    return pacientesFiltrados;
  }

  public ingresarPaciente(paciente: Paciente): void {
    this.pacientes.push(paciente);
  }

  public eliminarPaciente(): void {
    if (this.getPacientes().length === 0) {
      console.log("\nNo existen pacientes.");
      return;
    } else {
        console.table(this.getPacientes());
        const pacienteId: string = solicitarDatos('id', ' del paciente a eliminar');
        const pacienteNombre: string = solicitarDatos('nombre', ' del paciente a eliminar');
        const pacientesEncontrados: Paciente[] | undefined = this.filterPacientes(pacienteId, pacienteNombre, true);
        if (pacientesEncontrados.length === 1) {
          this.pacientes = this.filterPacientes(pacienteId, pacienteNombre, false);
          console.log(`\nSe eliminó el paciente ${pacienteNombre} con ID ${pacienteId} correctamente.`);
        } else if (pacientesEncontrados.length === 0) {
          console.error(`\nError: El paciente ${pacienteNombre} con ID ${pacienteId} no existe.`);
        } else {
          console.error(`\nError: Se encontraron ${pacientesEncontrados.length} pacientes con el ID ${pacienteId} y el nombre ${pacienteNombre}.`);
        }
      }
  }

  public editarPaciente(): void {
    if (this.getPacientes().length === 0) {
      console.log("\nNo existen pacientes.");
      return;
    } else {
        console.table(this.getPacientes());
        const pacienteId: string = solicitarDatos('id', ' del paciente a editar');
        const pacienteNombre: string = solicitarDatos('nombre', ' del paciente a editar');
        const pacientesEncontrados: Paciente[] | undefined = this.filterPacientes(pacienteId, pacienteNombre, true);
        if (pacientesEncontrados.length === 1) {
          const paciente: Paciente = pacientesEncontrados[0];
          let editar: string = solicitarDatos('editarPaciente');
          switch (editar) {
            case "1":
              const nombre: string = solicitarDatos('nombre', ' del paciente');
              paciente.setNombre(nombre);
              console.log(`\nSe edito el nombre del paciente con ID ${pacienteId} a ${paciente.getNombre()} correctamente.`);
              break;
            case "2":
              const especie: "perro" | "gato" | "exotica" = solicitarDatos('especie');
              paciente.setEspecie(especie);
              console.log(`\nSe edito la especie del paciente con ID ${pacienteId} a ${paciente.getEspecie()} correctamente.`);
              break;
            default:
              console.error(`\nError: No se pudo editar el paciente con ID ${pacienteId}.`);
              break;
          }
        } else if (pacientesEncontrados.length === 0) {
            console.error(`\nError: El paciente ${pacienteNombre} con ID ${pacienteId} no existe.`);
        } else {
            console.error(`\nError: Se encontraron ${pacientesEncontrados.length} pacientes con el ID ${pacienteId} y el nombre ${pacienteNombre}.`);
        }
      }
  }

}