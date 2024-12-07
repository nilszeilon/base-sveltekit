import { redirect, type RequestHandler } from '@sveltejs/kit'

export const GET: RequestHandler = async ({ url, locals: { supabase } }) => {
  const code = url.searchParams.get('code')
  const next = url.searchParams.get('next') ?? '/dashboard'

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      throw redirect(303, next)
    }
  }

  // If we get here, something went wrong
  throw redirect(303, '/auth?error=Could not authenticate user')
}
