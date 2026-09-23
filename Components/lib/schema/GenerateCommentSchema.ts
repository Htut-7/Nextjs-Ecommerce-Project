import z from "zod";

const GenerateCommentSchema=z.object({
    name: z.string(),
    email: z.string(),
    userComment: z.string(),
});

export default GenerateCommentSchema;