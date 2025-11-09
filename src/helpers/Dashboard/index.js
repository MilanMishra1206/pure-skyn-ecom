import Resources from "../../config/Resources";

export const skinCategories = [
  { name: "Pigmentation", subCategory: "pigmentation" },
  { name: "Sunscreen", subCategory: "sunscreen" },
  { name: "Facewash", subCategory: "facewash" },
  { name: "Moisturiser", subCategory: "moisturiser" },
  { name: "Face Serum", subCategory: "faceSerum" },
];

export const skinCategoryDetails = {
  pigmentation: {
    name: "Pigmentation",
    desc: "From occasional spots to full-on breakouts, to melasma, to freckles, to even hyperpigmentation we have you covered for blemish-free skin. Our treatments target excess melanin production at the source, dramatically reducing dark patches and evening out skin tone. Discover potent formulas that restore your skin's natural radiance and clarity.",
    imgSrc: Resources.images.home.skin.pigmentation,
    link: "/products/skin#pigmentation",
  },
  sunscreen: {
    name: "Sunscreen",
    desc: "Daily UV protection is the most critical step in any routine. Our broad-spectrum sunscreens shield your skin from damaging UVA/UVB rays and environmental pollutants. Choose from lightweight, non-comedogenic formulas that leave no white cast and protect against premature aging.",
    imgSrc: Resources.images.home.skin.pigmentation,
    link: "/products/skin#sunscreen",
  },
  faceSerum: {
    name: "Face Serum",
    desc: "Serums are highly concentrated treatments designed to deliver powerful active ingredients deep into the skin. Whether you need hydration, collagen boosting, or intensive repair, these potent liquids target specific concerns. Layer them effortlessly under your moisturizer to amplify your routine's effectiveness.",
    imgSrc: Resources.images.home.skin.pigmentation,
    link: "/products/skin#faceSerum",
  },
  facewash: {
    name: "Facewash",
    desc: "A clean canvas is essential for effective skincare. Our cleansers gently remove dirt, oil, makeup, and impurities without stripping your skin's natural barrier. Find the perfect wash, from balancing gels to hydrating creams, that leaves your skin feeling refreshed and ready for treatment.",
    imgSrc: Resources.images.home.skin.pigmentation,
    link: "/products/skin#facewash",
  },
  moisturiser: {
    name: "Moisturiser",
    desc: "Lock in hydration and strengthen your skin's protective barrier with our selection of moisturizers. We offer textures for every skin type, from lightweight gels for oily skin to rich creams for intense dryness. Proper moisturizing prevents moisture loss, keeping your skin plump, smooth, and resilient.",
    imgSrc: Resources.images.home.skin.pigmentation,
    link: "/products/skin#moisturiser",
  },
};

export const hairCategories = [
  { name: "Dandruff & Scalp Care", subCategory: "antiDandruff" },
  { name: "Hair Fall Control", subCategory: "hairGrowth" },
  // { name: "Split Ends & Dry Hair", subCategory: "splitEnds" },
  { name: "Oral Supplements", subCategory: "oralSupplements" },
];

export const hairCategoryDetails = {
  antiDandruff: {
    name: "Dandruff & Scalp Care",
    desc: "Medicated shampoos and treatments to soothe irritated scalps and combat dandruff.",
    imgSrc: Resources.images.home.hair.dandruff,
    link: "/products/hair",
  },
  hairGrowth: {
    name: "Hair Fall Control",
    desc: "Specialized products to strengthen hair follicles and reduce hair shedding.",
    imgSrc: Resources.images.home.hair.hairfall,
    link: "/products/hair",
  },
  splitEnds: {
    name: "Split Ends & Dry Hair",
    desc: "Hydrating serums and conditioners to restore moisture and repair damaged strands.",
    imgSrc: Resources.images.home.hair.messyHair,
    link: "/products/hair",
  },
  oralSupplements: {
    name: "Oral Supplements",
    desc: "Hair oral supplements are dietary products taken by mouth that contain vitamins, minerals, and other nutrients, intended to support hair growth, strength, and overall health from the inside out.",
    imgSrc: Resources.images.home.hair.hairOralSupplements,
    link: "/products/hair",
  },
};
