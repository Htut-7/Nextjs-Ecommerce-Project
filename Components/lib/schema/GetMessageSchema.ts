import {z} from "zod";

const GetMessageSchem=z.object({
    messageId: z.string()
})

export default GetMessageSchem;