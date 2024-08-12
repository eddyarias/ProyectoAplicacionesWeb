export class Juego{
    constructor(
        public _id:string,
        public nombre: string,
        public descripcion: string,
        public precio: number,
        public stock: number,
        public sku: number,
        public rating: number,
        public plataforma: string,
        public genero: string,
        public portada: string
    ){}    
}