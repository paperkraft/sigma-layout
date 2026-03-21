"use client";

import { PageHeader } from '@/components/shared/page-header';
import { Button } from '@/components/ui/button';
import { Check, Plus, Minus, ShoppingCart } from 'lucide-react';
import { useState, useMemo } from 'react';

const plans = [
  {
    id: "basic",
    name: "Standard",
    priceText: "₹25,000",
    priceValue: 25000,
    years: 1,
    users: 5,
    projects: 2,
    aquabill: "10,000",
    waterlab: "1,000",
    popular: false,
    btnText: "Select Plan",
    variant: "outline"
  },
  {
    id: "premium",
    name: "Premium",
    priceText: "₹50,000",
    priceValue: 50000,
    years: 2,
    users: 10,
    projects: 5,
    aquabill: "15,000",
    waterlab: "2,500",
    popular: true,
    btnText: "Select Plan",
    variant: "default"
  },
  {
    id: "professional",
    name: "Professional",
    priceText: "₹1,00,000",
    priceValue: 100000,
    years: 3,
    users: 20,
    projects: 10,
    aquabill: "20,000",
    waterlab: "5,000",
    popular: false,
    btnText: "Select Plan",
    variant: "outline"
  },
  {
    id: "custom",
    name: "Custom",
    priceText: "Custom",
    priceValue: 0,
    years: "Custom",
    users: "Custom",
    projects: "Custom",
    aquabill: "Custom",
    waterlab: "Custom",
    popular: false,
    btnText: "Contact Sales",
    variant: "secondary"
  }
];

const generalAddons = [
  { id: "addon_user", name: "Per User", priceText: "₹5,000", priceValue: 5000 },
  { id: "addon_project", name: "Per Project", priceText: "₹10,000", priceValue: 10000 },
];

const aquabillAddons = [
  { id: "addon_ab_20k", limit: "20,00k Bills", priceText: "₹75,000", priceValue: 75000 },
  { id: "addon_ab_30k", limit: "30,00k Bills", priceText: "₹1,25,000", priceValue: 125000 },
  { id: "addon_ab_50k", limit: "50,00k Bills", priceText: "₹2,00,000", priceValue: 200000 },
];

const waterlabAddons = [
  { id: "addon_wl_2k", limit: "2k Pipes", priceText: "₹75,000", priceValue: 75000 },
  { id: "addon_wl_5k", limit: "5k Pipes", priceText: "₹1,25,000", priceValue: 125000 },
  { id: "addon_wl_10k", limit: "10k Pipes", priceText: "₹2,00,000", priceValue: 200000 },
];

// Helper to format currency
const formatInr = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

export default function SubscriptionPage() {
  const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

  // State for add-on quantities: Record<addon_id, quantity>
  const [addonCart, setAddonCart] = useState<Record<string, number>>({});

  const handleUpdateAddon = (addonId: string, increment: number) => {
    setAddonCart((prev) => {
      const currentQty = prev[addonId] || 0;
      const newQty = Math.max(0, currentQty + increment);

      const newCart = { ...prev };
      if (newQty === 0) {
        delete newCart[addonId];
      } else {
        newCart[addonId] = newQty;
      }
      return newCart;
    });
  };

  // Calculate Cart Total
  const { total, addonTotal } = useMemo(() => {
    let planTotal = 0;
    if (selectedPlanId && selectedPlanId !== "custom") {
      const plan = plans.find(p => p.id === selectedPlanId);
      if (plan) planTotal = plan.priceValue;
    }

    let aTotal = 0;
    const allAddons = [...generalAddons, ...aquabillAddons, ...waterlabAddons];

    Object.entries(addonCart).forEach(([id, qty]) => {
      const addonDef = allAddons.find(a => a.id === id);
      if (addonDef) {
        aTotal += (addonDef.priceValue * qty);
      }
    });

    return { total: planTotal + aTotal, addonTotal: aTotal };
  }, [selectedPlanId, addonCart]);

  return (
    <div className="max-w-screen-2xl mx-auto p-4 md:p-6 space-y-6 pb-32 relative">
      <PageHeader
        title="Subscription Plans"
        description="Choose the right plan for your business needs."
      />

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {plans.map((plan) => {
          const isSelected = selectedPlanId === plan.id;
          return (
            <div
              key={plan.id}
              className={`relative flex flex-col bg-card rounded-2xl border-2 transition-all p-6 ${isSelected
                  ? 'border-primary shadow-lg ring-4 ring-primary/10'
                  : plan.popular
                    ? 'border-primary/50 hover:border-primary shadow-md hover:shadow-lg'
                    : 'border-border hover:border-primary/50 shadow-sm hover:shadow-md'
                }`}
            >
              {plan.popular && !isSelected && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary/90 text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              {isSelected && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1">
                  <Check className="size-3" /> Selected
                </div>
              )}

              <div className="mb-4">
                <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-foreground">{plan.priceText}</span>
                  {plan.priceText !== "Custom" && <span className="text-sm text-muted-foreground">/ base</span>}
                </div>
              </div>

              <div className="flex-1 space-y-4 mb-6">
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Check className={`size-4 shrink-0 border rounded-full p-0.5 ${isSelected ? 'border-primary bg-primary text-primary-foreground' : 'text-green-500 border-transparent'}`} />
                    <span><strong className="text-foreground">{plan.years}</strong> {plan.years === 1 ? 'Year' : 'Years'} validity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className={`size-4 shrink-0 border rounded-full p-0.5 ${isSelected ? 'border-primary bg-primary text-primary-foreground' : 'text-green-500 border-transparent'}`} />
                    <span><strong className="text-foreground">{plan.users}</strong> Users allowed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className={`size-4 shrink-0 border rounded-full p-0.5 ${isSelected ? 'border-primary bg-primary text-primary-foreground' : 'text-green-500 border-transparent'}`} />
                    <span><strong className="text-foreground">{plan.projects}</strong> Projects allowed</span>
                  </div>

                  <div className="pt-2 pb-1 border-t border-border mt-3">
                    <span className="text-xs font-semibold text-foreground uppercase tracking-wider">Aquabill Capacity</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className={`size-4 shrink-0 mt-0.5 border rounded-full p-0.5 ${isSelected ? 'border-primary bg-primary text-primary-foreground' : 'text-green-500 border-transparent'}`} />
                    <span className="leading-tight"><strong className="text-foreground">{plan.aquabill}</strong> Bills Generated</span>
                  </div>

                  <div className="pt-2 pb-1 border-t border-border mt-3">
                    <span className="text-xs font-semibold text-foreground uppercase tracking-wider">WaterLab Capacity</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <Check className={`size-4 shrink-0 mt-0.5 border rounded-full p-0.5 ${isSelected ? 'border-primary bg-primary text-primary-foreground' : 'text-green-500 border-transparent'}`} />
                    <span className="leading-tight"><strong className="text-foreground">{plan.waterlab}</strong> Pipes allowed</span>
                  </div>
                </div>
              </div>

              <Button
                variant={isSelected ? "secondary" : plan.variant as any}
                className={`w-full font-semibold ${isSelected ? 'border-primary border hover:bg-secondary' :
                    plan.popular ? 'bg-primary text-primary-foreground hover:bg-primary/90' : ''
                  }`}
                onClick={() => setSelectedPlanId(plan.id === "custom" ? null : plan.id)}
              >
                {plan.id === "custom" ? "Contact Sales" : isSelected ? "Selected" : plan.btnText}
              </Button>
            </div>
          )
        })}
      </div>

      {/* Add-ons Section */}
      <div className={`mt-12 pt-8 border-t border-border transition-opacity ${!selectedPlanId ? 'opacity-50 pointer-events-none' : ''}`}>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Plus className="size-5 text-primary" />
            Customize with Add-ons
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            {!selectedPlanId
              ? "Please select a base plan above to enable capacity expansions."
              : "Expand your base plan with these extensions. Validity seamlessly matches your active subscription."}
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

          {/* General Addons */}
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-foreground mb-4 border-b border-border pb-2">General Expansions</h3>
            <div className="space-y-4">
              {generalAddons.map((item) => {
                const qty = addonCart[item.id] || 0;
                return (
                  <div key={item.id} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-foreground text-sm">{item.name}</div>
                      <div className="text-xs text-muted-foreground">{item.priceText} each</div>
                    </div>
                    <div className="flex items-center gap-3 bg-secondary rounded-lg p-1 border border-border">
                      <button
                        onClick={() => handleUpdateAddon(item.id, -1)}
                        className={`size-6 flex items-center justify-center rounded-md transition-colors ${qty > 0 ? 'bg-background hover:bg-muted text-foreground hover:text-red-500 shadow-sm' : 'text-muted-foreground opacity-50 cursor-not-allowed'}`}
                      >
                        <Minus className="size-3" />
                      </button>
                      <span className="text-sm font-semibold w-4 text-center">{qty}</span>
                      <button
                        onClick={() => handleUpdateAddon(item.id, 1)}
                        className="size-6 flex items-center justify-center rounded-md bg-background hover:bg-muted text-foreground transition-colors shadow-sm"
                      >
                        <Plus className="size-3" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Aquabill Addons */}
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-foreground mb-4 border-b border-border pb-2">Aquabill Add-ons</h3>
            <div className="space-y-4">
              {aquabillAddons.map((item) => {
                const qty = addonCart[item.id] || 0;
                return (
                  <div key={item.id} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-foreground text-sm">{item.limit}</div>
                      <div className="text-xs text-muted-foreground">{item.priceText} each</div>
                    </div>
                    <div className="flex items-center gap-3 bg-secondary rounded-lg p-1 border border-border">
                      <button
                        onClick={() => handleUpdateAddon(item.id, -1)}
                        className={`size-6 flex items-center justify-center rounded-md transition-colors ${qty > 0 ? 'bg-background hover:bg-muted text-foreground hover:text-red-500 shadow-sm' : 'text-muted-foreground opacity-50 cursor-not-allowed'}`}
                      >
                        <Minus className="size-3" />
                      </button>
                      <span className="text-sm font-semibold w-4 text-center">{qty}</span>
                      <button
                        onClick={() => handleUpdateAddon(item.id, 1)}
                        className="size-6 flex items-center justify-center rounded-md bg-background hover:bg-muted text-foreground transition-colors shadow-sm"
                      >
                        <Plus className="size-3" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* WaterLab Addons */}
          <div className="bg-card border border-border rounded-xl p-5 shadow-sm">
            <h3 className="font-semibold text-foreground mb-4 border-b border-border pb-2">WaterLab Add-ons</h3>
            <div className="space-y-4">
              {waterlabAddons.map((item) => {
                const qty = addonCart[item.id] || 0;
                return (
                  <div key={item.id} className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-foreground text-sm">{item.limit}</div>
                      <div className="text-xs text-muted-foreground">{item.priceText} each</div>
                    </div>
                    <div className="flex items-center gap-3 bg-secondary rounded-lg p-1 border border-border">
                      <button
                        onClick={() => handleUpdateAddon(item.id, -1)}
                        className={`size-6 flex items-center justify-center rounded-md transition-colors ${qty > 0 ? 'bg-background hover:bg-muted text-foreground hover:text-red-500 shadow-sm' : 'text-muted-foreground opacity-50 cursor-not-allowed'}`}
                      >
                        <Minus className="size-3" />
                      </button>
                      <span className="text-sm font-semibold w-4 text-center">{qty}</span>
                      <button
                        onClick={() => handleUpdateAddon(item.id, 1)}
                        className="size-6 flex items-center justify-center rounded-md bg-background hover:bg-muted text-foreground transition-colors shadow-sm"
                      >
                        <Plus className="size-3" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Floating Cart Footer */}
      {(selectedPlanId || Object.keys(addonCart).length > 0) && (
        <div className="fixed top-0 md:top-16 left-0 md:left-auto right-0 md:right-6 md:w-120 bg-foreground text-background shadow-xl md:rounded-2xl z-50 animate-in slide-in-from-bottom-8 fade-in border border-border/20">
          <div className="p-4 md:p-5 flex flex-col md:flex-row items-center justify-between gap-4">

            <div className="flex items-center gap-3 w-full md:w-auto text-left">
              <div className="bg-background/20 p-2.5 rounded-xl shrink-0">
                <ShoppingCart className="size-5 text-background" />
              </div>
              <div>
                <p className="text-xs text-background/70 font-medium">Total Price (excl. Tax)</p>
                <p className="text-xl md:text-2xl font-bold leading-none">{formatInr(total)}</p>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 shrink-0"
              disabled={!selectedPlanId}
            >
              {!selectedPlanId ? 'Select a Plan' : 'Proceed to Summary'}
            </Button>

          </div>

          {/* Cart Breakdown Details */}
          {addonTotal > 0 && selectedPlanId && (
            <div className="px-5 pb-4 text-xs font-medium text-background/60 flex items-center gap-4">
              <span>Base: {formatInr(total - addonTotal)}</span>
              <span className="size-1 rounded-full bg-background/30" />
              <span>Add-ons: {formatInr(addonTotal)}</span>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
