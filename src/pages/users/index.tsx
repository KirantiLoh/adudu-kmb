import { User } from '@prisma/client';
import { useEffect, useState } from 'react'
import UserCard from 'src/components/UserCard';
import useDebounce from 'src/hooks/useDebounce';
import { trpc } from 'src/utils/trpc'

const UsersPage = () => {

    
    const { data: users } = trpc.users.getAllUsers.useQuery();
    
    const [query, setQuery] = useState("");
    const [filteredUsers, setFilteredUsers] = useState<User[]>(users || []);

    const debouncedQuery = useDebounce(query, 200);

    useEffect(() => {
        if (users) {
            setFilteredUsers(users);
        }
    }, [users])

    useEffect(() => {
        if (debouncedQuery === "") {
            console.log(filteredUsers)
            setFilteredUsers(users || [])
        }
        else {setFilteredUsers(users?.filter((user) => user.name?.toLowerCase()?.includes(debouncedQuery.toLocaleLowerCase())) || [])}
    }, [debouncedQuery])

  return (
    <main className='p-3'>
        <input type="text" placeholder='Cari orang' value={query} onChange={e => setQuery(e.target.value)} className='border-2 border-zinc-200 rounded-xl px-2 py-1 outline-none' />
        <hr className="my-3" />
        <ul className="flex flex-wrap gap-3">
            {filteredUsers && filteredUsers.map(user => {
                return (
                    <UserCard 
                        key={user.id}
                        id={user.id}
                        image={user.image as string}
                        name={user.name as string}
                    />
                )
            })}
        </ul>
    </main>
  )
}

export default UsersPage
