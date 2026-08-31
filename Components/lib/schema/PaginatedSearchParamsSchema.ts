import z from "zod";

const PaginatedSearchParamsSchema=z.object({
    page: z.number().int().positive().default(1),
    pageSize: z.number().int().positive().default(10),
    sort: z.string().optional(),
    filter:z.string().optional(),
    search: z.string().optional(),
})

export default PaginatedSearchParamsSchema;