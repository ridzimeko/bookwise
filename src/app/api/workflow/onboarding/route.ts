import { db } from "@/database/drizzle"
import { usersTable } from "@/database/schema"
import { sendEmail } from "@/lib/workflow"
import { serve } from "@upstash/workflow/nextjs"
import { eq } from "drizzle-orm"

type UserState = "non-active" | "active"
type InitialData = {
  email: string
  fullName: string
}

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
const THREE_DAY_IN_MS = 3 * ONE_DAY_IN_MS;
const ONE_MONTH_IN_MS = 30 * ONE_DAY_IN_MS;

const getUserState = async(email: string): Promise<UserState> => {
  const user = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.email, email))
        .limit(1)

  if (user.length === 0) return "non-active"
  
  const lastActivityDate = new Date(user[0].lastActivityDate!)
  const now = new Date()
  const timeDifference = now.getTime() - lastActivityDate.getTime()

  if (timeDifference > ONE_MONTH_IN_MS) {
    return "non-active"
  } else {
    return "active"
  }
}

export const { POST } = serve<InitialData>(async (context) => {
  const { email, fullName } = context.requestPayload

  // welcome email
  await context.run("new-signup", async () => {
    await sendEmail({
      email, 
      subject: 'Welcome to BookWise!',
      message: `
        <h1>Welcome to BookWise, ${fullName}!</h1>
        <p>We're excited to have you on board. Start exploring our library management solution today!</p>
      `
    })
  })

  await context.sleep("wait-for-3-days", 60 * 60 * 24 * 3)

  while (true) {
    const state = await context.run("check-user-state", async () => {
      return await getUserState(email)
    })

    if (state === "non-active") {
      await context.run("send-email-non-active", async () => {
        await sendEmail({
          email,
          subject: 'We miss you at BookWise!',
          message: `
            <h1>We miss you at BookWise!</h1>
            <p>It's been a while since we last saw you. Come back and explore the latest features and books in our library management solution.</p>
          `
        })
      })
    } else if (state === "active") {
      await context.run("send-email-active", async () => {
        await sendEmail({
          email,
          subject: 'Thank you for being an active member of BookWise!',
          message: `
            <h1>Thank you for being an active member of BookWise!</h1>
            <p>We appreciate your engagement with our library management solution. Keep exploring and enjoying the benefits we offer.</p>
          `
        })
      })
    }

    await context.sleep("wait-for-1-month", 60 * 60 * 24 * 30)
  }
})
