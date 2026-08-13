import { z } from "zod";

const UserSchema=z.object({
    username: z.string().min(6),
    password: z.string().min(10),
    email: z.string().email(),
    image: z.string().url(),
})

export default UserSchema;