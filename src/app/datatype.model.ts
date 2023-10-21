export interface LogIn{
    email:string,
    password:string
}
export interface userDetail{
    name: string; 
    email: string; 
    dob: Date; 
    number: number; 
    institute: string; 
    catagory: string; 
    percentage: number; 
    gender: string
}
export interface User{
    name: string,
    dob: Date,
    email:string,
    number:number,
    education:{
        institute:string,
        catagory:string,
        percentage:number
    },
    hobby?: {
        art:boolean,
        read:boolean,
        dance:boolean,
        music:boolean
    },
    gender:string,
    address?:{addedAddress:string}[],
    summary?:string
}