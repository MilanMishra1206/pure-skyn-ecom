export const reviewContent = [
  {
    id: 1,
    name: "Milan",
    date: "12-12-2025",
    rating: 4,
    review: "Best for combination skin. I love it so much.",
  },
  {
    id: 2,
    name: "Sophia",
    date: "13-12-2025",
    rating: 5,
    review: "Perfect for my oily skin. Keeps me feeling fresh all day!",
  },
  {
    id: 3,
    name: "Lucas",
    date: "14-12-2025",
    rating: 3,
    review: "It's okay, but didn't work as well for my dry skin.",
  },
  {
    id: 4,
    name: "Emma",
    date: "15-12-2025",
    rating: 4,
    review: "Great product! It has helped with my acne and redness.",
  },
  {
    id: 5,
    name: "Oliver",
    date: "16-12-2025",
    rating: 2,
    review:
      "Unfortunately, it didn't suit my skin type. My face got irritated.",
  },
  {
    id: 6,
    name: "Ava",
    date: "17-12-2025",
    rating: 5,
    review: "Absolutely love this! My skin feels smooth and looks radiant.",
  },
  {
    id: 7,
    name: "Ethan",
    date: "18-12-2025",
    rating: 4,
    review: "Good for sensitive skin. Leaves my face soft and moisturized.",
  },
  {
    id: 8,
    name: "Isabella",
    date: "19-12-2025",
    rating: 1,
    review: "Caused me a lot of breakouts. I wouldn't recommend it.",
  },
  {
    id: 9,
    name: "James",
    date: "20-12-2025",
    rating: 2,
    review: "Not the best for my skin, it left it feeling oily.",
  },
  {
    id: 10,
    name: "Amelia",
    date: "21-12-2025",
    rating: 3,
    review: "Decent product, but nothing special for my dry skin.",
  },
  {
    id: 11,
    name: "Benjamin",
    date: "22-12-2025",
    rating: 5,
    review: "Amazing! My skin feels so soft and smooth after using this.",
  },
  {
    id: 12,
    name: "Charlotte",
    date: "23-12-2025",
    rating: 4,
    review: "Great for daily use. Helps keep my skin hydrated and soft.",
  },
  {
    id: 13,
    name: "Oliver",
    date: "24-12-2025",
    rating: 3,
    review: "Works fine, but I didn't see any big improvement.",
  },
  {
    id: 14,
    name: "Mia",
    date: "25-12-2025",
    rating: 5,
    review: "Best product I've tried in a long time. Skin feels amazing!",
  },
  {
    id: 15,
    name: "Noah",
    date: "26-12-2025",
    rating: 4,
    review: "I like it, but I wish it would last a bit longer on my face.",
  },
  {
    id: 16,
    name: "Liam",
    date: "27-12-2025",
    rating: 5,
    review: "Perfect for my sensitive skin. My face feels so refreshed!",
  },
  {
    id: 17,
    name: "Ella",
    date: "28-12-2025",
    rating: 2,
    review: "Didn't work for me. It caused irritation after a few uses.",
  },
];

export const getShippingDate = (daysToAdd = 7) => {
  const today = new Date();
  today.setDate(today.getDate() + daysToAdd);
  return today.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
  });
};

export const chili = "#0f4a51";
export const chiliLight = "#15676e";

export const toTitleCase = (str) =>
  str
    .toLowerCase()
    .split(/([\s.-])/g)
    .map((word) =>
      word.match(/[\s.-]/) ? word : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join("");
