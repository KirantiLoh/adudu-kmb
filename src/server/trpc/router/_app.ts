import { router } from "../trpc";
import { messageRouter } from "./messages";
import { userRouter } from "./user";

export const appRouter = router({
  messages: messageRouter,
  users: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
