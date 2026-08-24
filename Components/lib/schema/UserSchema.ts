import { z } from "zod";

const UserSchema=z.object({
    username: z.string().min(6),
    email: z.string().email(),
    image: z.string().url().optional(),
})

export default UserSchema;