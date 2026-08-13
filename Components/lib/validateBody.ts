import { ZodError, ZodSchema } from "zod";

const validateBody=(body: unknown, schema: ZodSchema,partial:boolean=false)=>{
    const validateData= partial ? schema.partial().safeParse(body) : schema.safeParse(body) ;

    if(!validateData.success){
        throw new ZodError(validateData.error.issues);
    }
    return validateData.data;
}

export default validateBody;