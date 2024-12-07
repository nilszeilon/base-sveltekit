<script lang="ts">
  import { enhance } from "$app/forms";

  export let profile: any;
  export let form: any;

  let loading = false;

  function handleSubmit() {
    loading = true;
    return async ({ update }) => {
      await update();
      loading = false;
    };
  }
</script>

<form
  method="POST"
  action="?/updateProfile"
  use:enhance={handleSubmit}
  class="space-y-6"
>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div class="form-control w-full">
      <label for="first_name" class="label">
        <span class="label-text">First Name</span>
      </label>
      <input
        type="text"
        id="first_name"
        name="first_name"
        class="input input-bordered w-full"
        value={profile?.first_name ?? ""}
      />
    </div>

    <div class="form-control w-full">
      <label for="last_name" class="label">
        <span class="label-text">Last Name</span>
      </label>
      <input
        type="text"
        id="last_name"
        name="last_name"
        class="input input-bordered w-full"
        value={profile?.last_name ?? ""}
      />
    </div>
  </div>

  <div class="form-control w-full">
    <label for="twitter_url" class="label">
      <span class="label-text">Twitter Profile</span>
    </label>
    <input
      type="url"
      id="twitter_url"
      name="twitter_url"
      class="input input-bordered w-full"
      value={profile?.twitter_url ?? ""}
      placeholder="https://twitter.com/yourusername"
    />
  </div>

  {#if form?.error}
    <div class="alert alert-error shadow-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="stroke-current flex-shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{form.message}</span>
    </div>
  {/if}

  {#if form?.success}
    <div class="alert alert-success shadow-lg">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="stroke-current flex-shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      <span>{form.message}</span>
    </div>
  {/if}

  <div class="card-actions justify-end">
    <button type="submit" class="btn btn-primary" disabled={loading}>
      {#if loading}
        <span class="loading loading-spinner"></span>
      {/if}
      Save Changes
    </button>
  </div>
</form>
