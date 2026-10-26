import z from "zod";

const GetUserIdSchema=z.object({
    userId: z.string,
});

export default GetUserIdSchema;