import fetchHandler from "./fetchHandler";

const API_URL='http://localhost:3000/api'

export const api={
    users:{
        getAll: ()=>fetchHandler(API_URL+'/users'),

        create: (data:{username:string,password:string,email:string,image:string})=>fetchHandler(API_URL+'/users',{
            method: "POST",
            body: JSON.stringify(data)
        }),

        getById: (id:string)=>fetchHandler(API_URL+'/users/'+id),

        getByEmail: (email:string)=>fetchHandler(API_URL+'/users/email',{
            method:"POST",
            body: JSON.stringify({email})
        }),

        update: (id:string, data:{name?:string,password?:string,email?:string,image?:string})=>fetchHandler(API_URL+'/users/'+id,{
            method:"PUT",
            body: JSON.stringify(data),
        }),

        delete: (id:string)=>fetchHandler(API_URL+'/users/'+id,{
            method:"DELETE",
        })
    },
    
    products:{
        getAll: ()=>fetchHandler(API_URL+'/products'),

        create: (data: {name:string,description:string,category:string,brand:string,price:number,image:string})=>fetchHandler(API_URL+'/products',{
            method: "POST",
            body: JSON.stringify(data),
        }),

        getByName: (name:string)=>fetchHandler(API_URL+'/products/name',{
            method:"POST",
            body: JSON.stringify({name})
        }),

        update: (id:string, data:{name?:string,description?:string,brand?:string,price?:number,image?:string})=>fetchHandler(API_URL+'/products/'+id,{
            method: "PUT",
            body: JSON.stringify(data)
        }),

        delete: (id:string)=>fetchHandler(API_URL+'/products/'+id,{
            method:"DELETE"
        }),
    }
}