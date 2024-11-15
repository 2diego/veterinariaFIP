export class GeneradorID {
  private static idGeneradas: string[] = [];

  static generarId(): string {
    let nuevaId : string;
    
    do {
      nuevaId = (Math.floor(Math.random() * 99999)).toString();
    } while (this.idGeneradas.includes(nuevaId));
    
    if (nuevaId.length < 5) {
      nuevaId = nuevaId.padStart(5, '0');
    }

    this.idGeneradas.push(nuevaId);
    return nuevaId;
  }

  static eliminarId(id: string): void {
    const index = this.idGeneradas.indexOf(id);
    if (index !== -1) {
      this.idGeneradas.splice(index, 1);
    }
  }
}