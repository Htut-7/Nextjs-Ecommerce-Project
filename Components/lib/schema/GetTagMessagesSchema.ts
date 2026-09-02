import z from "zod";

const GetTagMessages=z.object({
    page: z.number().int().positive().default(1),
    pageSize: z.number().int().positive().default(10),
    sort: z.string().optional(),
    search: z.string().optional(),
    tagId: z.string(),
})

export default GetTagMessages;