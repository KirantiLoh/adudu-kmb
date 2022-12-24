import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { trpc } from "src/utils/trpc";

export default function SendMessage() {
  const router = useRouter();
  const { id } = router.query;

  const [anonym, setAnonym] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const session = useSession();

  const mutation = trpc.messages.sendMessage.useMutation();
  const send = async (e: SubmitEvent) => {
    e.preventDefault();
    if (!id) {
      router.push("/");
    }
    if (!content) {
        return
    }
    await mutation.mutate({
      sender: anonym ? null : (session.data?.user?.name as string | null),
      content,
      recieverId: id as string,
    });
    router.push('/')
  };

  return (
  <div className="flex justify-center items-center mt-12">
    <form onSubmit={send as any} className="flex w-[250px] flex-col">
        <div>
            <input
                className="mr-3"
                onChange={(e) => {
                setAnonym(e.target.checked);
                }}
                checked={anonym}
                type="checkbox"
                name="Sender"
            />
            <label htmlFor="Sender">Send Anonymously</label>
        </div>
      <label htmlFor="Content">Message</label>
      <textarea
        className="border border-black h-[300px] rounded-lg p-2"
        onChange={(e) => {
          setContent(e.target.value);
        }}
        value={content}
        name="Content"
      />
      <input className="mt-5 p-2 border border-black rounded-xl mb-10 cursor-pointer hover:text-white transition-all hover:bg-slate-700" type="submit" value="Send" />
    </form>
  </div>)
}
