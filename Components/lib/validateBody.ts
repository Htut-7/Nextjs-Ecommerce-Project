import { ZodError, ZodSchema } from "zod";

const validateBody=(body: unknown, schema: ZodSchema)=>{
    const validateData= schema.safeParse(body);

    if(!validateData.success){
        throw new ZodError(validateData.error.issues);
    }
    return validateData;
}

export default validateBody;