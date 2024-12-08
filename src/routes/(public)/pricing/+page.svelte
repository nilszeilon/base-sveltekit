<script lang="ts">
  import PricingCard from "$lib/components/pricing/PricingCard.svelte";
  import { goto } from "$app/navigation";

  const features = [
    "Unlimited access to all features",
    "Priority support",
    "API access",
    "Custom integrations",
    "Advanced analytics",
    "Lifetime updates",
  ];

  async function handlePayment() {
    // TODO: Implement payment logic
    // This could redirect to a checkout page or open a payment modal
    await goto("/checkout");
  }
</script>

<div class="min-h-screen bg-base-200 py-16">
  <div class="max-w-7xl mx-auto px-4">
    <!-- Header -->
    <div class="text-center mb-16">
      <h1 class="text-4xl font-bold mb-4">Simple, Transparent Pricing</h1>
      <p class="text-xl text-base-content/70">
        Get lifetime access with a one-time payment
      </p>
    </div>

    <!-- Pricing Card -->
    <div class="flex justify-center">
      <PricingCard
        title="Lifetime Access"
        price={49}
        description="Everything you need to supercharge your workflow"
        {features}
      />
    </div>

    <!-- FAQ Section -->
    <div class="mt-20 max-w-3xl mx-auto">
      <h2 class="text-2xl font-bold text-center mb-8">
        Frequently Asked Questions
      </h2>

      <div class="space-y-4">
        <div class="collapse collapse-plus bg-base-100">
          <input type="radio" name="my-accordion-3" checked="checked" />
          <div class="collapse-title text-xl font-medium">
            What's included in the lifetime access?
          </div>
          <div class="collapse-content">
            <p>
              You get unlimited access to all current and future features of the
              application, including priority support and all future updates.
            </p>
          </div>
        </div>

        <div class="collapse collapse-plus bg-base-100">
          <input type="radio" name="my-accordion-3" />
          <div class="collapse-title text-xl font-medium">
            Is there a refund policy?
          </div>
          <div class="collapse-content">
            <p>
              Yes, we offer a 30-day money-back guarantee. If you're not
              satisfied with your purchase, we'll provide a full refund.
            </p>
          </div>
        </div>

        <div class="collapse collapse-plus bg-base-100">
          <input type="radio" name="my-accordion-3" />
          <div class="collapse-title text-xl font-medium">
            Do I get access to future updates?
          </div>
          <div class="collapse-content">
            <p>
              Absolutely! Your lifetime access includes all future updates and
              improvements to the platform at no additional cost.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
