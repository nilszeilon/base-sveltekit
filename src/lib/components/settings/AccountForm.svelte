<script lang="ts">
  import { enhance } from "$app/forms";

  export let user: any;
  export let form: any;

  let loading = false;
  let showDeleteConfirm = false;
  let confirmEmail = "";

  function handleSubmit() {
    loading = true;
    return async ({ update }) => {
      await update();
      loading = false;
    };
  }

  $: isDeleteEnabled = confirmEmail === user?.email;
</script>

<div class="space-y-6">
  <div class="card bg-base-200 shadow-xl">
    <div class="card-body">
      <h2 class="card-title text-error">Danger Zone</h2>
      <p class="text-sm opacity-75">
        Once you delete your account, there is no going back. Please be certain.
      </p>

      {#if !showDeleteConfirm}
        <div class="card-actions justify-end">
          <button
            type="button"
            class="btn btn-error"
            on:click={() => (showDeleteConfirm = true)}
          >
            Delete Account
          </button>
        </div>
      {:else}
        <form
          method="POST"
          action="?/deleteAccount"
          use:enhance={handleSubmit}
          class="space-y-4"
        >
          <div class="form-control w-full">
            <label for="confirm_email" class="label">
              <span class="label-text"
                >To confirm, type your email address: <span class="font-bold"
                  >{user?.email}</span
                ></span
              >
            </label>
            <input
              type="text"
              id="confirm_email"
              bind:value={confirmEmail}
              class="input input-bordered w-full"
              placeholder="Enter your email"
            />
          </div>

          <div class="card-actions justify-end space-x-2">
            <button
              type="button"
              class="btn"
              on:click={() => {
                showDeleteConfirm = false;
                confirmEmail = "";
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
              class="btn btn-error"
              disabled={!isDeleteEnabled || loading}
            >
              {#if loading}
                <span class="loading loading-spinner"></span>
              {/if}
              I understand, delete my account
            </button>
          </div>
        </form>
      {/if}
    </div>
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
</div>
