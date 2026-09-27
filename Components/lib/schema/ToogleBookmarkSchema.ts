import z from "zod";

const ToogleBookmarkSchema=z.object({
    messageId: z.string(),
});

export default ToogleBookmarkSchema