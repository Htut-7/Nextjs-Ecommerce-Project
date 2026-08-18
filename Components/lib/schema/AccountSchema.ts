import {z} from "zod";

const AccountSchema=z.object({
    userId: z.string(),
    username: z.string().min(1,"username is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().optional(),
    provider: z.string().min(1, "Provider is required"),
    providerAccountId: z.string().min(1, "Provider account ID is required"),
    image: z.string().url("Image url is required"),
})

export default AccountSchema;