import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const messageRouter = router({
    getMessagesById: protectedProcedure
        .input(z.object({
            receiverId: z.string()
        }))
        .query(async ({ctx, input}) => {
            const messages = await ctx.prisma.message.findMany({
                where: {
                    recieverId: input.receiverId
                }
            });
            return messages;
        }),
        sendMessage: protectedProcedure.input(z.object({
            sender: z.string().nullable(),
            recieverId: z.string(),
            content: z.string()
        })).mutation(async ({ctx, input}) => {
            const message = await ctx.prisma.message.create({
                data: {
                    content: input.content,
                    reciever: {
                        connect: {
                            id: input.recieverId
                        }
                    },
                    sender: input.sender
                }
            })
            return message;
        })
    })