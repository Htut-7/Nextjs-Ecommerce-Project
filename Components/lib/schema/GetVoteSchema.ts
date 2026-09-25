import z from "zod";

const GetVoteSchema=z.object({
    type: z.enum(["message", "comment"]),
    typeId: z.string(),
});

export default GetVoteSchema;