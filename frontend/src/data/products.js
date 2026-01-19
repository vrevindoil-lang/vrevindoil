// Product data with all details for each oil
export const productsData = [
  {
    id: 'coconut',
    name: 'Coconut Oil',
    frontImage: new URL('../assets/images/coconut.png', import.meta.url).href,
    backImage: new URL('../assets/images/coconut2.png', import.meta.url).href,
    description: 'Cold-pressed virgin coconut oil extracted from fresh coconuts. Rich in medium-chain triglycerides (MCTs) and lauric acid. Perfect for cooking, baking, and skincare. Our coconut oil is pure, unrefined, and contains no additives or preservatives.',
    sizes: [
      { size: '500ml', price: 249 },
      { size: '1 Liter', price: 399 },
      { size: '2 Liter', price: 749 },
      { size: '5 Liter', price: 1799 },
      { size: '15 Liter', price: 4999 }
    ]
  },
  {
    id: 'groundnut',
    name: 'Groundnut Oil',
    frontImage: new URL('../assets/images/ground.png', import.meta.url).href,
    backImage: new URL('../assets/images/ground2.png', import.meta.url).href,
    description: 'Premium quality groundnut oil ideal for traditional Indian cooking. Rich in Vitamin E and antioxidants. Has a light flavor that complements all dishes. Cold-pressed and processed without any chemicals or heat treatment to preserve nutrients.',
    sizes: [
      { size: '500ml', price: 249 },
      { size: '1 Liter', price: 399 },
      { size: '2 Liter', price: 749 },
      { size: '5 Liter', price: 1799 },
      { size: '15 Liter', price: 4999 }
    ]
  },
  {
    id: 'sunflower',
    name: 'Sunflower Oil',
    frontImage: new URL('../assets/images/sun.png', import.meta.url).href,
    backImage: new URL('../assets/images/sun2.png', import.meta.url).href,
    description: 'Light and healthy sunflower oil perfect for everyday cooking. High in linoleic acid and Vitamin E. Neutral flavor makes it ideal for all types of cuisine. Cold-pressed to maintain nutritional value and natural taste.',
    sizes: [
      { size: '500ml', price: 249 },
      { size: '1 Liter', price: 399 },
      { size: '2 Liter', price: 749 },
      { size: '5 Liter', price: 1799 },
      { size: '15 Liter', price: 4999 }
    ]
  },
  {
    id: 'jaggery',
    name: 'Jaggery Oil',
    frontImage: new URL('../assets/images/jaggery.png', import.meta.url).href,
    backImage: new URL('../assets/images/jaggery.png', import.meta.url).href,
    description: 'Premium quality jaggery oil infused with natural goodness. Rich in minerals and iron, perfect for boosting immunity and energy. Traditional recipe with authentic taste. No refined sugar, only natural sweetness from pure jaggery extract.',
    sizes: [
      { size: '500ml', price: 299 },
      { size: '1 Liter', price: 449 },
      { size: '2 Liter', price: 849 },
      { size: '5 Liter', price: 1999 },
      { size: '15 Liter', price: 5499 }
    ]
  }
];
