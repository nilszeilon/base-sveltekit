<script lang="ts">
  import type { PageData } from "./$types";
  import AccountForm from "$lib/components/settings/AccountForm.svelte";

  export let data: PageData;
  export let form;
</script>

<h2 class="text-2xl font-bold mb-6">Account Settings</h2>
<AccountForm user={data.user} {form} />
