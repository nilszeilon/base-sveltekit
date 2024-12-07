import { error } from '@sveltejs/kit';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
  const { supabase } = locals;
  const { data: profile, error: err } = await supabase
    .from('profiles')
    .select('*')
    .single();

  if (err) {
    throw error(500, 'Error fetching profile');
  }

  return {
    profile
  };
};

export const actions: Actions = {
  updateProfile: async ({ request, locals }) => {
    const formData = await request.formData();
    const first_name = formData.get('first_name') as string;
    const last_name = formData.get('last_name') as string;
    const twitter_url = formData.get('twitter_url') as string;

    const { supabase } = locals;

    const { error: err } = await supabase
      .from('profiles')
      .update({
        first_name,
        last_name,
        twitter_url,
        updated_at: new Date().toISOString()
      })
      .eq('id', locals.session?.user.id);

    if (err) {
      return {
        error: true,
        message: 'Error updating profile'
      };
    }

    return {
      success: true,
      message: 'Profile updated successfully'
    };
  }
};

