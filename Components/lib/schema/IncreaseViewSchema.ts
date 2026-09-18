import z from "zod";

const IncreaseViewSchema= z.object({
    messageId: z.string(),
});

export default IncreaseViewSchema;