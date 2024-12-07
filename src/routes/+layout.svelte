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

<nav>
  {#if !session}
    <a href="/auth">Login</a>
  {:else}
    <button
      onclick={async () => {
        await supabase.auth.signOut();
        invalidate("supabase:auth");
      }}
    >
      Sign Out
    </button>
  {/if}
</nav>

{@render children()}
