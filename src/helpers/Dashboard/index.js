import Resources from "../../config/Resources";

export const skinCategories = [
  { name: "Sunscreen", subCategory: "sunscreen" },
  { name: "Pigmentation", subCategory: "pigmentation" },
  { name: "Facewash", subCategory: "facewash" },
  { name: "Moisturiser", subCategory: "moisturiser" },
  { name: "Face Serum", subCategory: "faceSerum" },
];

export const skinCategoryDetails = {
  sunscreen: {
    name: "Sunscreen",
    desc: "Daily UV protection is the most critical step in any routine. Our broad-spectrum sunscreens shield your skin from damaging UVA/UVB rays and pollutants. Choose from lightweight, non-comedogenic formulas that leave no white cast and protect against premature aging.",
    imgSrc: Resources.images.home.skin.sunscreen,
    link: "/products/skin#sunscreen",
  },
  pigmentation: {
    name: "Pigmentation",
    desc: "Targeting melasma, freckles, and hyperpigmentation, our treatments reduce excess melanin production at the source. Discover potent formulas that dramatically reduce dark patches and restore your skin's natural radiance and clarity.",
    imgSrc: Resources.images.home.skin.pigmentation,
    link: "/products/skin#pigmentation",
  },
  faceSerum: {
    name: "Face Serum",
    desc: "Serums are highly concentrated treatments that deliver powerful active ingredients deep into the skin. Whether for hydration, collagen boosting, or intensive repair, these potent liquids target specific concerns. Layer them under your moisturizer to amplify your routine's effectiveness.",
    imgSrc: Resources.images.home.skin.serum,
    link: "/products/skin#faceSerum",
  },
  facewash: {
    name: "Facewash",
    desc: "A clean canvas is essential for effective skincare. Our cleansers gently remove dirt, oil, makeup, and impurities without stripping your skin's natural barrier. Find the perfect wash to leave your skin feeling refreshed and ready for treatment.",
    imgSrc: Resources.images.home.skin.faceWash,
    link: "/products/skin#facewash",
  },
  moisturiser: {
    name: "Moisturiser",
    desc: "Lock in hydration and strengthen your skin's protective barrier with our selection of moisturizers. We offer textures for every skin type, from lightweight gels to rich creams. Proper moisturizing prevents moisture loss, keeping your skin plump, smooth, and resilient.",
    imgSrc: Resources.images.home.skin.moisturiser,
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
    desc: "Medicated shampoos and specialized treatments are formulated to soothe irritated scalps and effectively combat flaking caused by dandruff. Discover targeted solutions that rebalance your scalp's microbiome, reducing irritation and restoring comfort for healthier-looking hair from the root.",
    imgSrc: Resources.images.home.hair.dandruff,
    link: "/products/hair",
  },
  hairGrowth: {
    name: "Hair Fall Control",
    desc: "Explore our range of specialized products, including topical serums and fortifying shampoos, meticulously designed to strengthen hair follicles from the root. These solutions work to significantly reduce hair shedding, promote thickness, and maintain the density of your hair over time.",
    imgSrc: Resources.images.home.hair.hairfall,
    link: "/products/hair",
  },
  splitEnds: {
    name: "Split Ends & Dry Hair",
    desc: "Our intensely hydrating serums, rich masks, and nourishing conditioners are formulated to instantly restore essential moisture to thirsty hair. These treatments work to seal and repair damaged, split strands, preventing future breakage and leaving hair smooth, soft, and visibly healthy.",
    imgSrc: Resources.images.home.hair.messyHair,
    link: "/products/hair",
  },
  oralSupplements: {
    name: "Oral Supplements",
    desc: "Hair oral supplements are carefully curated dietary products taken by mouth, packed with essential vitamins, minerals, and potent nutrients. They are specifically formulated to support robust hair growth cycles, enhance strand strength, and nourish overall hair health from the inside out, addressing deficiencies that topical products cannot.",
    imgSrc: Resources.images.home.hair.hairOralSupplements,
    link: "/products/hair",
  },
};
