import z from "zod";

const GetUserMessageSchema=z.object({
    userId: z.string(),
    page: z.number().positive().optional(),
    pageSize: z.number().positive().optional(),
});

export default GetUserMessageSchema;