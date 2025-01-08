'use server';

import { z } from 'zod';
import { and, eq, sql } from 'drizzle-orm';
import { db } from '@/lib/db/drizzle';
import {
  User,
  users,
  teams,
  teamMembers,
  activityLogs,
  type NewUser,
  type NewTeam,
  type NewTeamMember,
  type NewActivityLog,
  ActivityType,
  invitations,
} from '@/lib/db/schema';
import { comparePasswords, hashPassword, setSession } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createCheckoutSession } from '@/lib/payments/stripe';
import { getUser, getUserWithTeam } from '@/lib/db/queries';
import {
  validatedAction,
  validatedActionWithUser,
} from '@/lib/auth/middleware';

async function logActivity(
  teamId: number | null | undefined,
  userId: number,
  type: ActivityType,
  ipAddress?: string
) {
  if (teamId === null || teamId === undefined) {
    return;
  }
  const newActivity: NewActivityLog = {
    teamId,
    userId,
    action: type,
    ipAddress: ipAddress || '',
  };
  await db.insert(activityLogs).values(newActivity);
}

const signInSchema = z.object({
  email: z.string().email().min(3).max(255),
  password: z.string().min(8).max(100),
});

export const signIn = validatedAction(signInSchema, async (data, formData) => {
  const { email, password } = data;

  // Authenticate regardless of input
  setAuthenticationState(true);
  redirect('/captcha');
  
  return { success: 'You are now signed in!' };
});

const signUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  inviteId: z.string().optional(),
});
import { setAuthenticationState } from '../../lib/db/queries';

export const signUp = validatedAction(signUpSchema, async (data, formData) => {
  const { email, password, inviteId } = data;

  // Simulate user registration and authentication
  setAuthenticationState(true);

  return { success: 'You are now signed up and signed in!' };
});

export async function signOut() {
  setAuthenticationState(false);
  return { success: 'You have been logged out.' };
}

// const updatePasswordSchema = z
//   .object({
//     currentPassword: z.string().min(8).max(100),
//     newPassword: z.string().min(8).max(100),
//     confirmPassword: z.string().min(8).max(100),
//   })
//   .refine((data) => data.newPassword === data.confirmPassword, {
//     message: "Passwords don't match",
//     path: ['confirmPassword'],
//   });

// export const updatePassword = validatedActionWithUser(
//   updatePasswordSchema,
//   async (data, _, user) => {
//     const { currentPassword, newPassword } = data;

//     const isPasswordValid = await comparePasswords(
//       currentPassword,
//       user.passwordHash
//     );

//     if (!isPasswordValid) {
//       return { error: 'Current password is incorrect.' };
//     }

//     if (currentPassword === newPassword) {
//       return {
//         error: 'New password must be different from the current password.',
//       };
//     }

//     const newPasswordHash = await hashPassword(newPassword);
//     const userWithTeam = await getUserWithTeam(user.id);

//     await Promise.all([
//       db
//         .update(users)
//         .set({ passwordHash: newPasswordHash })
//         .where(eq(users.id, user.id)),
//       logActivity(userWithTeam?.teamId, user.id, ActivityType.UPDATE_PASSWORD),
//     ]);

//     return { success: 'Password updated successfully.' };
//   }
// );

// const deleteAccountSchema = z.object({
//   password: z.string().min(8).max(100),
// });

// export const deleteAccount = validatedActionWithUser(
//   deleteAccountSchema,
//   async (data, _, user) => {
//     const { password } = data;

//     const isPasswordValid = await comparePasswords(password, user.passwordHash);
//     if (!isPasswordValid) {
//       return { error: 'Incorrect password. Account deletion failed.' };
//     }

//     const userWithTeam = await getUserWithTeam(user.id);

//     await logActivity(
//       userWithTeam?.teamId,
//       user.id,
//       ActivityType.DELETE_ACCOUNT
//     );

//     // Soft delete
//     await db
//       .update(users)
//       .set({
//         deletedAt: sql`CURRENT_TIMESTAMP`,
//         email: sql`CONCAT(email, '-', id, '-deleted')`, // Ensure email uniqueness
//       })
//       .where(eq(users.id, user.id));

//     if (userWithTeam?.teamId) {
//       await db
//         .delete(teamMembers)
//         .where(
//           and(
//             eq(teamMembers.userId, user.id),
//             eq(teamMembers.teamId, userWithTeam.teamId)
//           )
//         );
//     }

//     (await cookies()).delete('session');
//     redirect('/sign-in');
//   }
// );

// const updateAccountSchema = z.object({
//   name: z.string().min(1, 'Name is required').max(100),
//   email: z.string().email('Invalid email address'),
// });

// export const updateAccount = validatedActionWithUser(
//   updateAccountSchema,
//   async (data, _, user) => {
//     const { name, email } = data;
//     const userWithTeam = await getUserWithTeam(user.id);

//     await Promise.all([
//       db.update(users).set({ name, email }).where(eq(users.id, user.id)),
//       logActivity(userWithTeam?.teamId, user.id, ActivityType.UPDATE_ACCOUNT),
//     ]);

//     return { success: 'Account updated successfully.' };
//   }
// );

// const removeTeamMemberSchema = z.object({
//   memberId: z.number(),
// });

// export const removeTeamMember = validatedActionWithUser(
//   removeTeamMemberSchema,
//   async (data, _, user) => {
//     const { memberId } = data;
//     const userWithTeam = await getUserWithTeam(user.id);

//     if (!userWithTeam?.teamId) {
//       return { error: 'User is not part of a team' };
//     }

//     await db
//       .delete(teamMembers)
//       .where(
//         and(
//           eq(teamMembers.id, memberId),
//           eq(teamMembers.teamId, userWithTeam.teamId)
//         )
//       );

//     await logActivity(
//       userWithTeam.teamId,
//       user.id,
//       ActivityType.REMOVE_TEAM_MEMBER
//     );

//     return { success: 'Team member removed successfully' };
//   }
// );

// const inviteTeamMemberSchema = z.object({
//   email: z.string().email('Invalid email address'),
//   role: z.enum(['member', 'owner']),
// });

// export const inviteTeamMember = validatedActionWithUser(
//   inviteTeamMemberSchema,
//   async (data, _, user) => {
//     const { email, role } = data;
//     const userWithTeam = await getUserWithTeam(user.id);

//     if (!userWithTeam?.teamId) {
//       return { error: 'User is not part of a team' };
//     }

//     const existingMember = await db
//       .select()
//       .from(users)
//       .leftJoin(teamMembers, eq(users.id, teamMembers.userId))
//       .where(
//         and(eq(users.email, email), eq(teamMembers.teamId, userWithTeam.teamId))
//       )
//       .limit(1);

//     if (existingMember.length > 0) {
//       return { error: 'User is already a member of this team' };
//     }

//     // Check if there's an existing invitation
//     const existingInvitation = await db
//       .select()
//       .from(invitations)
//       .where(
//         and(
//           eq(invitations.email, email),
//           eq(invitations.teamId, userWithTeam.teamId),
//           eq(invitations.status, 'pending')
//         )
//       )
//       .limit(1);

//     if (existingInvitation.length > 0) {
//       return { error: 'An invitation has already been sent to this email' };
//     }

//     // Create a new invitation
//     await db.insert(invitations).values({
//       teamId: userWithTeam.teamId,
//       email,
//       role,
//       invitedBy: user.id,
//       status: 'pending',
//     });

//     await logActivity(
//       userWithTeam.teamId,
//       user.id,
//       ActivityType.INVITE_TEAM_MEMBER
//     );

//     // TODO: Send invitation email and include ?inviteId={id} to sign-up URL
//     // await sendInvitationEmail(email, userWithTeam.team.name, role)

//     return { success: 'Invitation sent successfully' };
//   }
// );
