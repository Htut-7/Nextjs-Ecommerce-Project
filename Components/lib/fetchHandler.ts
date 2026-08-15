import { handleErrorResponse } from "./response";

interface FetchOptions extends RequestInit{
    timeout?:  number,
}

export default async function fetchHandler(
    url: string,
    options: FetchOptions={}
){
    const {timeout=5000, headers:customHeaders, ...restOptions}=options;

    const controller= new AbortController();

   const id= setTimeout(()=>{
        controller.abort();
    },timeout)

    const defaultHeaders={
        "Content-Type": "Application/json",
        Accept: "Application/json"
    }

    const config={
        ...restOptions,
        headers:{
            ...defaultHeaders,
            ...customHeaders
        },
        signal: controller.signal,
    }

    try{
         const response=await fetch(url,config);
        clearTimeout(id);

        if(!response.ok){
            throw new Error('HTTP Error')
        }else{
            return await response.json()
        }
    }catch(error){
        if(error instanceof Error && error.name==='AbortError'){
            throw new Error('Request Timeout')
        }else{
            return handleErrorResponse(error);
        }
    }

   

  
}