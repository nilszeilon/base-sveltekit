<script lang="ts">
  import { page } from '$app/stores';
</script>

<div class="min-h-screen bg-base-200">
  <div class="max-w-7xl mx-auto px-4 py-8">
    <div class="flex flex-col md:flex-row gap-6">
      <!-- Sidebar Navigation -->
      <aside class="w-full md:w-64 shrink-0">
        <nav class="menu bg-base-100 rounded-box">
          <div class="menu-title">User Settings</div>
          <ul>
            <li>
              <a 
                href="/settings/profile" 
                class={$page.url.pathname === '/settings/profile' ? 'active' : ''}
              >
                Profile
              </a>
            </li>
            <li>
              <a 
                href="/settings/account" 
                class={$page.url.pathname === '/settings/account' ? 'active' : ''}
              >
                Account
              </a>
            </li>
            <li>
              <a 
                href="/settings/billing" 
                class={$page.url.pathname === '/settings/billing' ? 'active' : ''}
              >
                Billing
              </a>
            </li>
            <li>
              <a 
                href="/settings/usage" 
                class={$page.url.pathname === '/settings/usage' ? 'active' : ''}
              >
                Usage
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <!-- Main Content -->
      <main class="flex-1">
        <div class="card bg-base-100 shadow-xl">
          <div class="card-body">
            <slot />
          </div>
        </div>
      </main>
    </div>
  </div>
</div>

