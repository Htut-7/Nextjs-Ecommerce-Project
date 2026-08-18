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
    },

    accounts:{
        getAll: ()=>fetchHandler(API_URL+'/accounts'),

        create: (data: {
            userId: string,
            username:string,
            email: string,
            password?: string,
            provider: string,
            providerAccountId: string,
        })=>fetchHandler(API_URL+'/account',{
            method:"POST",
            body: JSON.stringify(data)
        }),

        getById: (id:string)=>fetchHandler(API_URL+"/accounts/"+id),

        getByProvider: (providerAccountId:string, )=>fetchHandler(API_URL+'/accounts/provider',{
            method:"POST",
            body: JSON.stringify({providerAccountId})
        }),

        update: (id:string,data:{
            userId?:string
            username?:string,
            email?:string,
            password?:string,
            provider?:string,
            providerAccountId?:string,
            image?:string
        })=>fetchHandler(API_URL+"/accounts"+id,{
            method:"PUT",
            body: JSON.stringify(data)
        }),

        delete: (id:string)=>fetchHandler(API_URL+"/accounts"+id,{
            method:"DELETE"
        })
    },
    auth:{
        oAuthSignin: ({provider,providerAccountId,user}:{
            provider:string,
            providerAccountId:string,
            user:{
                username:string,
                password?:string,
                email:string,
                image:string,
            }
        })=>fetchHandler(API_URL+'/auth/signin-with-oauth',{
            method:"POST",
            body: JSON.stringify({provider,providerAccountId,user})
        })
    }
}