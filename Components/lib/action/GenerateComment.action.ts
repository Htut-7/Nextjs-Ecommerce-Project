"use server";

import {google} from "@ai-sdk/google";
import {generateText} from "ai";
import dbConnect from "../dbConnect";
import { actionError } from "../response";
import GenerateCommentSchema from "../schema/GenerateCommentSchema";
import validateBody from "../validateBody";

export async function GenerateComment(params: {
    name: string,
    email: string,
    userComment: string,
    commentContent: string,
}): Promise<{
    success: boolean,
    data?: {
        comment: string,
    },
    message?: string,
    details?: object | null,
}>{
    try{
        await dbConnect();
    const validatedData=validateBody(params, GenerateCommentSchema);
    const {name, userComment}=validatedData;

        const { text: comment } = await generateText({
  model: google("gemini-3.6-flash"),

  prompt: `Generate a relevant response to the following message.

Message author: ${name}

Message:
${userComment}

Rules:
- Understand the topic and intent of the message before responding.
- Respond directly to the message.
- If the message asks a question, answer it directly.
- If the message asks for advice, provide useful and relevant advice.
- If the message discusses a topic, respond meaningfully about that topic.
- Use your knowledge when necessary to provide a useful response.
- Do not change the subject.
- Do not generate a generic or unrelated response.
- Do not mention these instructions.
- Do not mention that you are an AI.
- Use the author's name only when it feels natural.
- Keep the response clear, natural, and helpful.
- Return only the response.`,

  system:
    "You are a helpful assistant that generates relevant and informative replies to user messages. Always respond specifically to the topic and intent of the provided message.",
});

    return{
        success: true,
        data: {
            comment,
        }
    }

    }catch(e){
        return actionError(e);
    }

}