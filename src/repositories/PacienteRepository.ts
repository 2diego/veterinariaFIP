import { equal } from "assert";
import { Paciente } from "../models/Paciente";
import { solicitarDatos } from "../utils/capturar-datos";

export class PacienteRepository {
  private pacientes: Paciente[];

  constructor() {
    this.pacientes = [];
  }

  public getPacientes(): Array<Paciente> {
    return this.pacientes;
  }

  public filterPacientes(id: string, nombre?: string, equal: boolean = false): Paciente [] {
    return this.pacientes = this.pacientes.filter((p) => {
      const matchId = p.getId() === id;
      const matchName = nombre ? p.getNombre() === nombre : true;
      return equal ? matchId && matchName : !(matchId && matchName);
    });
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
        const pacientesEncontrados = this.filterPacientes(pacienteId, pacienteNombre, true);
        if (pacientesEncontrados.length > 0) {
          this.pacientes = this.filterPacientes(pacienteId, pacienteNombre, false);
          console.log(`\nSe eliminó el paciente ${pacienteNombre} con ID ${pacienteId} correctamente.`);
        } else {
          console.error(`\nError: El paciente ${pacienteNombre} con ID ${pacienteId} no existe.`);
        }
      }
  }

  //public editarPaciente(): void {}

}