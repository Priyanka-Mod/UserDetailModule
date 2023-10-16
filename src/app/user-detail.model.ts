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