import z from "zod";

const CreateCommentSchema=z.object({
    messageId: z.string(),
    content: z.string(),
});

export default CreateCommentSchema;