<script lang="ts">
  import type { PageData } from './$types';
  import ProfileForm from '$lib/components/settings/ProfileForm.svelte';
  
  export let data: PageData;
  export let form;
</script>

<h2 class="text-2xl font-bold mb-6">Profile Settings</h2>
<ProfileForm profile={data.profile} {form} />

