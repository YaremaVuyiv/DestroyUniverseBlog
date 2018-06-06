export class User {
    constructor(

        public email?: string,
        public userName?: string,
        public password?: string,
        public role?: string,
        public passwordConfirm?:string, 
    ) { }
}