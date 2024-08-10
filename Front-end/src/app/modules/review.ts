export class Review{
    constructor(
        public _id:string,
        public id: number,
        public user_id: number,
        public producto_id: number,
        public comentario: string,
        public rating: number,
        public userName?: string,  
        public userImage?: string  
    ){
    }
}