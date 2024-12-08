<script lang="ts">
  export let title: string;
  export let price: number;
  export let description: string;
  export let features: string[];
  export let loading = false;

  function handleSubscribe() {
    loading = true;
    // Payment logic will be handled by the parent
  }
</script>

<div class="card w-96 bg-base-100 shadow-xl hover:shadow-2xl transition-shadow duration-300">
  <div class="card-body">
    <h2 class="card-title text-2xl font-bold text-center mb-2">{title}</h2>
    <div class="text-center mb-4">
      <span class="text-4xl font-bold">${price}</span>
      <span class="text-base-content/70">one-time</span>
    </div>
    
    <p class="text-center text-base-content/70 mb-6">{description}</p>
    
    <div class="space-y-3 mb-6">
      {#each features as feature}
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-success" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
          <span>{feature}</span>
        </div>
      {/each}
    </div>

    <div class="card-actions justify-center">
      <button 
        class="btn btn-primary btn-wide" 
        on:click={handleSubscribe} 
        disabled={loading}
      >
        {#if loading}
          <span class="loading loading-spinner"></span>
        {:else}
          Get Started
        {/if}
      </button>
    </div>
  </div>
</div>

