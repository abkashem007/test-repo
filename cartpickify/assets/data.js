/* CartPickify — site content.
   Edit this one file to fill in real products, scores, prices and your
   ClickBank hoplinks. Every "Check price" button on the site reads its link
   from `affiliateUrl` via the product `id`. Values in [brackets] are
   placeholders carried over from the mockup. */
window.CP_DATA = {
  // Accent colour for buy buttons. Mockup options: #C2410C, #1D4ED8, #1E6B4F, #B45309
  cta: '#C2410C',

  goals: [
    { id: 'weight', label: 'Weight management', short: 'Weight', reviews: '[N]',
      intro: 'Metabolism, appetite and fat-burner formulas — scored on dosing, refund terms and how aggressive the checkout upsells are.',
      icon: '<path d="M12 3v18M7 8h10M5 14h14"/><circle cx="12" cy="12" r="9"/>' },
    { id: 'blood-sugar', label: 'Blood sugar support', short: 'Blood sugar', reviews: '[N]',
      intro: 'Plant-based glucose support blends, checked against the doses used in published research.',
      icon: '<path d="M12 3c3 4 6 7 6 11a6 6 0 01-12 0c0-4 3-7 6-11z"/>' },
    { id: 'sleep', label: 'Sleep & stress', short: 'Sleep', reviews: '[N]',
      intro: 'Non-habit-forming sleep and calm formulas, with onset time and next-day grogginess noted in the cons.',
      icon: '<path d="M20 14.5A8 8 0 019.5 4a8 8 0 1010.5 10.5z"/>' },
    { id: 'joints', label: 'Joint & mobility', short: 'Joints', reviews: '[N]',
      intro: 'Joint comfort and mobility supplements — collagen, curcumin, boswellia and friends, dose by dose.',
      icon: '<circle cx="12" cy="6" r="3"/><path d="M12 9v6M8 21l4-6 4 6"/>' },
    { id: 'brain', label: 'Brain & focus', short: 'Brain & Focus', reviews: '[N]',
      intro: 'Nootropic and memory blends, with proprietary blends and under-dosed stimulants called out.',
      icon: '<path d="M9 4a4 4 0 00-4 4c-1.5.5-2 2-2 3a3 3 0 002 3 4 4 0 004 5h1V4zM15 4a4 4 0 014 4c1.5.5 2 2 2 3a3 3 0 01-2 3 4 4 0 01-4 5h-1V4z"/>' },
    { id: 'gut', label: 'Oral & gut health', short: 'Oral & gut', reviews: '[N]',
      intro: 'Probiotics for gut and oral health — strain counts, CFU at expiry and storage requirements.',
      icon: '<path d="M4 10c0-4 4-6 8-6s8 2 8 6v2c0 5-3 8-8 8s-8-3-8-8z"/><path d="M9 11h.01M15 11h.01M9 15c2 1.5 4 1.5 6 0"/>' }
  ],

  // Ranked by CartPickify score. `goal` must match a goal id above.
  products: [
    { id: 'product-a', rank: 1, goal: 'blood-sugar', badge: 'Best overall', name: '[Product Name A]',
      tagline: '[One-line positioning, e.g. “A plant-based formula for healthy blood sugar support.”]',
      blurb: '[Why it wins in one sentence: standout ingredient, fair pricing, solid guarantee.]',
      score: '[9.x]', price: '[$XX]', guarantee: '[60]', format: 'Capsules',
      caveat: '[The one caveat from our review, e.g. order only from the official site; skip the upsell.]',
      review: 'review.html', affiliateUrl: '#', image: '' },
    { id: 'product-b', rank: 2, goal: 'weight', badge: 'Best value', name: '[Product Name B]',
      tagline: '[One-line positioning.]',
      blurb: '[Lowest cost per serving on the multi-bottle bundle; fewer upsells at checkout.]',
      score: '[8.x]', price: '[$XX]', guarantee: '[60]', format: 'Powder / drink',
      caveat: '[Caveat from the review.]', review: 'review.html', affiliateUrl: '#', image: '' },
    { id: 'product-c', rank: 3, goal: 'sleep', badge: 'Gentlest formula', name: '[Product Name C]',
      tagline: '[One-line positioning.]',
      blurb: '[Non-habit-forming blend; note the slower onset in the cons.]',
      score: '[8.x]', price: '[$XX]', guarantee: '[60]', format: 'Gummies',
      caveat: '[Caveat from the review.]', review: 'review.html', affiliateUrl: '#', image: '' },
    { id: 'product-d', rank: 4, goal: 'joints', badge: 'Best for mobility', name: '[Product Name D]',
      tagline: '[One-line positioning.]',
      blurb: '[What sets it apart for joint comfort in one sentence.]',
      score: '[8.x]', price: '[$XX]', guarantee: '[60]', format: 'Capsules',
      caveat: '[Caveat from the review.]', review: 'review.html', affiliateUrl: '#', image: '' },
    { id: 'product-e', rank: 5, goal: 'brain', badge: 'Best stim-free', name: '[Product Name E]',
      tagline: '[One-line positioning.]',
      blurb: '[What sets it apart for focus in one sentence.]',
      score: '[7.x]', price: '[$XX]', guarantee: '[60]', format: 'Capsules',
      caveat: '[Caveat from the review.]', review: 'review.html', affiliateUrl: '#', image: '' },
    { id: 'product-f', rank: 6, goal: 'gut', badge: 'Most strains', name: '[Product Name F]',
      tagline: '[One-line positioning.]',
      blurb: '[What sets it apart for gut / oral health in one sentence.]',
      score: '[7.x]', price: '[$XX]', guarantee: '[60]', format: 'Gummies',
      caveat: '[Caveat from the review.]', review: 'review.html', affiliateUrl: '#', image: '' }
  ],

  // Reviews, comparisons and guides shown in "Latest" and on reviews.html
  posts: [
    { type: 'Review', title: '[Product Name] Review: Is It Worth It in [Year]?', url: 'review.html', goal: 'blood-sugar', read: '[X]', date: '[Date]' },
    { type: 'Comparison', title: '[Product A] vs [Product B]: Which One Fits You?', url: 'compare.html', goal: 'weight', read: '[X]', date: '[Date]' },
    { type: 'Guide', title: 'How to Spot a Supplement Scam in 5 Minutes', url: 'guide.html', goal: '', read: '[X]', date: '[Date]' },
    { type: 'Review', title: '[Product Name C] Review: Gentle Sleep Support?', url: 'review.html', goal: 'sleep', read: '[X]', date: '[Date]' },
    { type: 'Review', title: '[Product Name D] Review: Joint Relief or Hype?', url: 'review.html', goal: 'joints', read: '[X]', date: '[Date]' },
    { type: 'Guide', title: 'Proprietary Blends: What They Hide and Why It Matters', url: 'guide.html', goal: '', read: '[X]', date: '[Date]' }
  ],

  // Quiz (3 questions → email → result). Goal answers map to goal ids.
  quiz: [
    { title: 'What’s your #1 health goal right now?', sub: 'Pick the one that matters most.',
      options: [
        { label: 'Lose weight', goal: 'weight' },
        { label: 'Steady blood sugar', goal: 'blood-sugar' },
        { label: 'Sleep better', goal: 'sleep' },
        { label: 'Ease joint discomfort', goal: 'joints' }
      ] },
    { title: 'Which format would you actually stick with?', sub: 'Consistency beats everything.',
      options: [{ label: 'Capsules' }, { label: 'Powder / drink' }, { label: 'Gummies' }, { label: 'No preference' }] },
    { title: 'What monthly budget feels comfortable?', sub: 'Bundles usually lower the per-bottle price.',
      options: [{ label: 'Under $40' }, { label: '$40–$60' }, { label: '$60+' }, { label: 'Show best value' }] }
  ]
};
