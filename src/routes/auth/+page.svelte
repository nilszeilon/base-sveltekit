<script lang="ts">
  import { enhance } from "$app/forms";
  export let form;
</script>

<div class="min-h-screen hero bg-base-200">
  <div class="hero-content flex-col">
    <div
      class="card w-full max-w-lg min-h-[24rem] min-w-[24rem] shadow-2xl bg-base-100"
    >
      <div class="card-body">
        <h2 class=" text-2xl font-bold text-center">Welcome</h2>
        <p class="text-center text-sm opacity-70">Please sign in to continue</p>

        <form method="POST" action="?/login" use:enhance class="space-y-4">
          <div class="form-control">
            <label for="email" class="label">
              <span class="label-text">Email address</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              class="input input-bordered w-full"
            />
          </div>
          {#if form?.error}
            <div class="alert alert-error shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                ><path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                /></svg
              >
              <span>{form.message}</span>
            </div>
          {:else if form?.success}
            <div class="alert alert-success shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                ><path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                /></svg
              >
              <span>{form.message}</span>
            </div>
          {:else}
            <div class="form-control mt-6">
              <button type="submit" class="btn btn-primary"> Sign in </button>
            </div>
            <p class="opacity-70">
              If you already have an account we will log you in.
            </p>
          {/if}
        </form>
      </div>
    </div>
  </div>
</div>
