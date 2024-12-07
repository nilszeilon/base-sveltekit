<script>
  import { invalidate } from "$app/navigation";
  import { onMount } from "svelte";

  import "../app.css";
  let { data, children } = $props();
  let { session, supabase } = $derived(data);

  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
      if (newSession?.expires_at !== session?.expires_at) {
        invalidate("supabase:auth");
      }
    });

    return () => data.subscription.unsubscribe();
  });
</script>

<div class="navbar bg-base-100 shadow-lg">
  <div class="navbar-start">
    <a href="/" class="btn btn-ghost normal-case text-xl">YourApp</a>
  </div>
  
  <div class="navbar-end">
    {#if !session}
      <a href="/auth" class="btn btn-primary">Login</a>
    {:else}
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img src={session.user?.user_metadata?.avatar_url || `https://ui-avatars.com/api/?name=${session.user.email}`} alt="Profile" />
          </div>
        </label>
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
          <li><a href="/dashboard">Dashboard</a></li>
          <li><a href="/settings">Profile</a></li>
          <li>
            <button
              on:click={async () => {
                await supabase.auth.signOut();
                invalidate("supabase:auth");
              }}
              class="text-error"
            >
              Sign Out
            </button>
          </li>
        </ul>
      </div>
    {/if}
  </div>
</div>

{@render children()}
