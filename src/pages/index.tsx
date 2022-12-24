import { type NextPage } from "next";
import Link from "next/link";
import { useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";
import Message from "src/components/Message";

const Home: NextPage = () => {

  const { data: session } = useSession();

  const { data: messages } = trpc.messages.getMessagesById.useQuery({receiverId: session?.user?.id as string}, {
    enabled: !!session?.user?.id
  })

  

  return (
      <main className="p-3">
        <h1 className="text-3xl">Welcome {session?.user?.name}</h1>
        <hr className="my-3" />
        <ul className="flex flex-wrap gap-3">
          {
            messages?.map(
              (message, id) => <Message content={message.content} createdAt={new Date(message.createdAt)} sender={message.sender ? message.sender : "Anon"} key={id} /> 
            )
          }
        </ul>
      </main>
  );
};

export default Home;