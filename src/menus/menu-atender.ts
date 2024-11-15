import { Veterinaria } from "../models/Veterinaria";

export function menuAtender(veterinaria: Veterinaria): void {
  console.log(`\n======= ATENCION AL PUBLICO =======`);
  veterinaria.atender();
}