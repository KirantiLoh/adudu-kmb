import { protectedProcedure, router } from "../trpc";

export const userRouter = router({
    getAllUsers: protectedProcedure
        .query(async ({ctx}) => {
            const allUser = await ctx.prisma.user.findMany();
            return allUser
        })
})
