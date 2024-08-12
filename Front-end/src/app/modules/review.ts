export class Review{
    constructor(
        public _id:string,
        public producto_id: number,
        public comentario: string,
        public rating: number,
        public user_id: string,
        public userName?: string,  
        public userImage?: string  
    ){
    }
}