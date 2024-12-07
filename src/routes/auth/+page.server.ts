import { redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions: Actions = {
  login: async ({ request, locals: { supabase }, url }) => {
    const formData = await request.formData()
    const email = formData.get('email') as string

    console.log(url.origin)
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${url.origin}/auth/confirm`,
      }
    })

    if (error) {
      console.error(error)
      return { success: false, error: error.message }
    }

    return {
      success: true,
      message: 'Check your email for the magic link!'
    }
  },

  logout: async ({ locals: { supabase } }) => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error(error)
      return { success: false, error: error.message }
    }

    // Redirect to home page after successful signout
    throw redirect(303, '/')
  }
}
