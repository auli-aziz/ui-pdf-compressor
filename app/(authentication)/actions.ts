'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

// Helper function for validation
function validateSchema(schema, data) {
  try {
    return { success: schema.parse(data) };
  } catch (err: any) {
    return { error: err.errors };
  }
}

// Log activity function
async function logActivity(
  teamId: number | null | undefined,
  userId: number,
  ipAddress?: string
) {
  if (teamId === null || teamId === undefined) {
    return;
  }
  // Log activity logic here
}

// Sign In Function
export async function signIn(data: { email: string; password: string }) {
  const signInSchema = z.object({
    email: z.string().email().min(3).max(255),
    password: z.string().min(8).max(100),
  });

  const validation = validateSchema(signInSchema, data);
  if (validation.error) {
    return { error: validation.error };
  }

  const { email, password } = validation.success;

  // Example authentication logic (mocked)
  redirect('/dashboard');
}

// Sign Up Function
export async function signUp(data: {
  email: string;
  password: string;
  inviteId?: string;
}) {
  const signUpSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
    inviteId: z.string().optional(),
  });

  const validation = validateSchema(signUpSchema, data);
  if (validation.error) {
    return { error: validation.error };
  }

  const { email, password, inviteId } = validation.success;

  // Example registration logic (mocked)
  redirect('/welcome');

  return { success: 'You are now signed up and signed in!' };
}

// Sign Out Function
export async function signOut() {
  // Simulate clearing session or cookies
  return { success: 'You have been logged out.' };
}
