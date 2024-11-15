import { menuPrincipal } from "./menus/menu-principal";
import { Veterinaria } from "./models/Veterinaria";


let veterinaria: Veterinaria = new Veterinaria("Veterinaria Olavarria", "Colon 1234");

function main(veterinaria: Veterinaria): void {
  menuPrincipal(veterinaria);
}

main(veterinaria);