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
        const paciente: Paciente | undefined = this.getPacientes().find(paciente => paciente.getId() === pacienteId)
        if (paciente && paciente.getNombre() === pacienteNombre) {
          this.pacientes = this.pacientes.filter((p) => !(p.getId() === pacienteId && p.getNombre() === pacienteNombre));
          console.log(`\nSe elimino el paciente ${pacienteNombre} con ID ${pacienteId} correctamente.`);
        } else {
            console.error(`\nError: El paciente ${pacienteNombre} con ID ${pacienteId} no existe.`);
          } 
      }
  }

  public eliminarPacientesPorId(id: string): void {
    this.pacientes = this.pacientes.filter((p) => !(p.getId() === id));
  }

}