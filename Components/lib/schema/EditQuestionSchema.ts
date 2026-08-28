import { z } from "zod";

const EditQuestionSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),

  email: z.string().email({ message: "Invalid email address" }),

  content: z.string().min(1, { message: "Message is required" }),

  tags: z.array(z.string()).min(1, { message: "Tags is required" }),
  messageId:z.string()
});

export default EditQuestionSchema;