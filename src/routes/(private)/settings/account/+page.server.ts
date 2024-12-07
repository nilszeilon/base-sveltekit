import { error, fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';
import { createClient } from '@supabase/supabase-js';
import { PRIVATE_SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';
import { PUBLIC_SUPABASE_URL } from '$env/static/public';

export const load: PageServerLoad = async ({ locals }) => {
  const { supabase, session } = locals;

  if (!session?.user) {
    throw redirect(303, '/login');
  }

  return {
    user: session.user
  };
};

export const actions: Actions = {
  deleteAccount: async ({ locals }) => {
    const { supabase, session } = locals;

    if (!session?.user) {
      return fail(401, {
        error: true,
        message: 'Not authenticated'
      });
    }

    // Delete user's profile first
    const { error: profileError } = await supabase
      .from('profiles')
      .delete()
      .eq('id', session.user.id);

    if (profileError) {
      return fail(500, {
        error: true,
        message: 'Error deleting profile'
      });
    }

    // Create an admin client with service role
    const adminClient = createClient(
      PUBLIC_SUPABASE_URL,
      PRIVATE_SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    // Delete the user account from auth.users using admin client
    const { error: userError } = await adminClient.auth.admin.deleteUser(
      session.user.id
    );

    if (userError) {
      return fail(500, {
        error: true,
        message: 'Error deleting user account'
      });
    }

    // Sign out the user
    const { error: signOutError } = await supabase.auth.signOut();

    if (signOutError) {
      return fail(500, {
        error: true,
        message: 'Error signing out'
      });
    }

    throw redirect(303, '/');
  }
};

