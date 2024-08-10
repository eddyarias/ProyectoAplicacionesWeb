export class User{
    constructor(
        public _id:string,
        public id:number,
        public nombre:string,
        public email: string,
        public password: string,
        public imagen:string
    ){
    }
}