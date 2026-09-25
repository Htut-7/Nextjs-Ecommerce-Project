import z from "zod";

const VoteActionSchema=z.object({
    type: z.enum(["comment", "message"]),
    typeId: z.string(),
    voteType: z.enum(["like","dislike"]),
});

export default VoteActionSchema;