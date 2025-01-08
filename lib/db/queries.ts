import { desc, and, eq, isNull } from 'drizzle-orm';
import { db } from './drizzle';
import { activityLogs, teamMembers, teams, users } from './schema';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth/session';

let isAuthenticated = false;

export async function getUser() {
  // Return a mock user object if authenticated, otherwise return null
  if (isAuthenticated) {
    return {
      id: 1,
      email: 'mockuser@example.com',
      role: 'user',
    };
  }
  return null;
}

// Export function to modify authentication state (used for sign-in/out)
export function setAuthenticationState(authState: boolean) {
  isAuthenticated = authState;
}

export async function getTeamByStripeCustomerId(customerId: string) {
  const result = await db
    .select()
    .from(teams)
    .where(eq(teams.stripeCustomerId, customerId))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function updateTeamSubscription(
  teamId: number,
  subscriptionData: {
    stripeSubscriptionId: string | null;
    stripeProductId: string | null;
    planName: string | null;
    subscriptionStatus: string;
  }
) {
  await db
    .update(teams)
    .set({
      ...subscriptionData,
      updatedAt: new Date(),
    })
    .where(eq(teams.id, teamId));
}

export async function getUserWithTeam(userId: number) {
  const result = await db
    .select({
      user: users,
      teamId: teamMembers.teamId,
    })
    .from(users)
    .leftJoin(teamMembers, eq(users.id, teamMembers.userId))
    .where(eq(users.id, userId))
    .limit(1);

  return result[0];
}

export async function getActivityLogs() {
  const user = await getUser();
  // if (!user) {
  //   throw new Error('User not authenticated');
  // }

  // return await db
  //   .select({
  //     id: activityLogs.id,
  //     action: activityLogs.action,
  //     timestamp: activityLogs.timestamp,
  //     ipAddress: activityLogs.ipAddress,
  //     userName: users.name,
  //   })
  //   .from(activityLogs)
  //   .leftJoin(users, eq(activityLogs.userId, users.id))
  //   // .where(eq(activityLogs.userId, user.id))
  //   .orderBy(desc(activityLogs.timestamp))
  //   .limit(10);
  return [
    {
      id: 1,
      action: 'Logged in',
      timestamp: '2024-10-22T09:24:00Z',
      ipAddress: '192.168.1.1',
      userName: 'John Doe',
    },
    {
      id: 2,
      action: 'Updated profile',
      timestamp: '2024-10-21T14:15:00Z',
      ipAddress: '192.168.1.2',
      userName: 'John Doe',
    },
    {
      id: 3,
      action: 'Logged out',
      timestamp: '2024-10-21T12:30:00Z',
      ipAddress: '192.168.1.3',
      userName: 'John Doe',
    },
    {
      id: 4,
      action: 'Changed password',
      timestamp: '2024-10-20T16:45:00Z',
      ipAddress: '192.168.1.4',
      userName: 'John Doe',
    },
    {
      id: 5,
      action: 'Logged in',
      timestamp: '2024-10-20T09:00:00Z',
      ipAddress: '192.168.1.5',
      userName: 'John Doe',
    },
  ];
}

export async function getTeamForUser(userId: number) {
  const result = await db.query.users.findFirst({
    where: eq(users.id, userId),
    with: {
      teamMembers: {
        with: {
          team: {
            with: {
              teamMembers: {
                with: {
                  user: {
                    columns: {
                      id: true,
                      name: true,
                      email: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  return result?.teamMembers[0]?.team || null;
}
