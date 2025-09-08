import { db } from '@/database/drizzle'
import { usersTable } from '@/database/schema'
import { DataTable } from './data-table'


async function Page() {
    const result = await db.select().from(usersTable)

  return (
    <DataTable data={result} />
  )
}

export default Page
