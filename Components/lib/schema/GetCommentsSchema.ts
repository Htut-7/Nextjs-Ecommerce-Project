import z from "zod";

const GetCommentsSchema=z.object({
    page: z.number().positive(),
    pageSize: z.number().positive(),
    filter: z.string(),
    messageId: z.string(),
});

export default GetCommentsSchema;