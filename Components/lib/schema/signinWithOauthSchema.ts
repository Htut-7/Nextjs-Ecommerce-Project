import {z} from "zod";

const signinWithOauthSchema=z.object(
    {
        provider: z.enum(['github','google']),
        providerAccountId: z.string(),
        user: z.object({
        username:z.string().min(6,"Username is required"),
        email: z.string().email(),
        image: z.string().url().optional(),
        })
    }
);

export default signinWithOauthSchema;
