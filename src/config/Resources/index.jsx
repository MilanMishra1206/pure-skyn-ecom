// const base = `${import.meta.env.BASE_URL}images`;
const base = "/images";

const Resources = {
  images: {
    common: {
      removeItem: `${base}/common/remove-from-cart.png`,
    },
    home: {
      hairGrow: `${base}/home/hair_grow.webp`,
      arthwaLogo: `${base}/home/arthwa_logo.png`,
      consultDoctor: `${base}/home/consult_doctor.jpg`,
      hairSuppliment: `${base}/home/HAIR_SUPPLIMENT.png`,
      immunitySuppliment: `${base}/home/INMUNITY_SUPPLIMENT.png`,
      skinSuppliment: `${base}/home/SKIN_SUPPLIMENT.png`,
      banner: {
        bannerMain: `${base}/home/banner/bannerMain.png`,
        mobileBanner: `${base}/home/banner/mobileBanner.png`,
        bannerChild: `${base}/home/banner/banner_child.png`,
        bannerConsult: `${base}/home/banner/banner_consult.png`,
        bannerHair: `${base}/home/banner/banner_hair.png`,
        bannerSkin: `${base}/home/banner/banner_skin.png`,
        bannerSupplements: `${base}/home/banner/banner_supplements.png`,
      },
      hair: {
        dandruff: `${base}/home/hair/dandruff.png`,
        hairfall: `${base}/home/hair/hair_fall.png`,
        messyHair: `${base}/home/hair/messy_hair.png`,
        itchyScalp: `${base}/home/hair/itchy_scalp.png`,
      },
      skin: {
        ageing: `${base}/home/skin/ageing.png`,
        acneScar: `${base}/home/skin/acne_scar.png`,
        darkCircle: `${base}/home/skin/dark_circle.png`,
        eczema: `${base}/home/skin/eczema.png`,
        pigmentation: `${base}/home/skin/pigmentation.png`,
        sensitiveSkin: `${base}/home/skin/sensitive_skin.png`,
      },
    },
    navbar: {
      skinNavbar: `${base}/navbar/skinNavbar.webp`,
      hairNavbar: `${base}/navbar/hairNavbar.jpg`,
    },
    cart: {
      emptyCart: `${base}/cart/emptyCart.png`,
    },
    footer: {
      certified: `${base}/footer/certified.png`,
      codAvailable: `${base}/footer/cod_available.png`,
      dermat: `${base}/footer/dermat.png`,
      freeDelivery: `${base}/footer/free_delivery.png`,
      originalImg: `${base}/footer/original_img.webp`,
    },
    products: {
      sunscreen: {
        dermaticaAzeProactiveLotion: {
          img1: `${base}/products/sunscreen/dermatica-aze-proactive-lotion/img1.jpeg`,
          img2: `${base}/products/sunscreen/dermatica-aze-proactive-lotion/img2.jpeg`,
          img3: `${base}/products/sunscreen/dermatica-aze-proactive-lotion/img3.jpeg`,
          img4: `${base}/products/sunscreen/dermatica-aze-proactive-lotion/img4.jpeg`,
        },
        berlion: {
          img1: `${base}/products/sunscreen/berlion/img1.webp`,
          img2: `${base}/products/sunscreen/berlion/img2.webp`,
          img3: `${base}/products/sunscreen/berlion/img3.webp`,
          img4: `${base}/products/sunscreen/berlion/img4.webp`,
          img5: `${base}/products/sunscreen/berlion/img5.webp`,
        },
        rayback: {
          img1: `${base}/products/sunscreen/rayback/img1.jpg`,
          img2: `${base}/products/sunscreen/rayback/img2.jpg`,
          img3: `${base}/products/sunscreen/rayback/img3.webp`,
        },
        seeckusSuncreen: {
          img1: `${base}/products/sunscreen/seeckusSuncreen/img1.webp`,
          img2: `${base}/products/sunscreen/seeckusSuncreen/img3.webp`,
          img3: `${base}/products/sunscreen/seeckusSuncreen/img5.webp`,
          img4: `${base}/products/sunscreen/seeckusSuncreen/img6.webp`,
        },
        sunlite: {
          img1: `${base}/products/sunscreen/sunlite/img1.webp`,
          img2: `${base}/products/sunscreen/sunlite/img2.webp`,
          img3: `${base}/products/sunscreen/sunlite/img3.webp`,
          img4: `${base}/products/sunscreen/sunlite/img4.webp`,
        },
        tintSunscreen: {
          img1: `${base}/products/sunscreen/tint-sunscreen/img1.webp`,
          img2: `${base}/products/sunscreen/tint-sunscreen/img2.webp`,
          img3: `${base}/products/sunscreen/tint-sunscreen/img3.webp`,
        },
      },
      faceSerum: {
        ageliteSerum: {
          img1: `${base}/products/face-serum/agelite-serum/img1.jpg`,
        },
        cshine: {
          img1: `${base}/products/face-serum/cshine/img1.jpg`,
          img2: `${base}/products/face-serum/cshine/img2.jpg`,
        },
        ilumeSerum: {
          img1: `${base}/products/face-serum/ilume-serum/img1.jpg`,
        },
      },
      facewash: {
        agelite: {
          img1: `${base}/products/facewash/agelite/img1.jpg`,
          img2: `${base}/products/facewash/agelite/img2.jpg`,
          img3: `${base}/products/facewash/agelite/img3.jpg`,
          img4: `${base}/products/facewash/agelite/img4.jpg`,
        },
        aquaedege: {
          img1: `${base}/products/facewash/aquaedege/img1.jpg`,
          img2: `${base}/products/facewash/aquaedege/img2.jpg`,
          img3: `${base}/products/facewash/aquaedege/img3.jpg`,
        },
        dsglow: {
          img1: `${base}/products/facewash/dsglow/img1.webp`,
          img2: `${base}/products/facewash/dsglow/img5.webp`,
          img3: `${base}/products/facewash/dsglow/img6.webp`,
          img4: `${base}/products/facewash/dsglow/img4.webp`,
        },
        tabulaAst: {
          img1: `${base}/products/facewash/tabula-ast/img1.webp`,
          img2: `${base}/products/facewash/tabula-ast/img2.webp`,
        },
        tabulaOs: {
          img1: `${base}/products/facewash/tabula-os/img1.webp`,
          img2: `${base}/products/facewash/tabula-os/img2.webp`,
        },
        tabulaRasaDs: {
          img1: `${base}/products/facewash/tabula-rasa-ds/img1.webp`,
          img2: `${base}/products/facewash/tabula-rasa-ds/img2.png`,
        },
      },
      moisturiser: {
        cerasoft: {
          img1: `${base}/products/moisturiser/cerasoft/img1.jpg`,
          img2: `${base}/products/moisturiser/cerasoft/img2.jpg`,
        },
        fiMoist: {
          img1: `${base}/products/moisturiser/fi-moist/img1.jpg`,
        },
        moiser: {
          img1: `${base}/products/moisturiser/moiser/img1.jpg`,
        },
        relizmaLotion: {
          img1: `${base}/products/moisturiser/relizma-lotion/img1.webp`,
          img2: `${base}/products/moisturiser/relizma-lotion/img2.webp`,
        },
        uligo: {
          img1: `${base}/products/moisturiser/uligo/img1.jpg`,
          img2: `${base}/products/moisturiser/uligo/img2.jpg`,
        },
        uresoft: {
          img1: `${base}/products/moisturiser/uresoft/img1.webp`,
          img2: `${base}/products/moisturiser/uresoft/img2.webp`,
          img3: `${base}/products/moisturiser/uresoft/img3.webp`,
        },
      },
      pigmentation: {
        glambakUltra: {
          img1: `${base}/products/pigmentation/glambak-ultra/img1.webp`,
        },
        kcliteGold: {
          img1: `${base}/products/pigmentation/kclite-gold/img1.jpg`,
        },
        lumiedgeCream: {
          img1: `${base}/products/pigmentation/lumiedge-cream/img1.jpg`,
          img2: `${base}/products/pigmentation/lumiedge-cream/img2.jpg`,
          img3: `${base}/products/pigmentation/lumiedge-cream/img3.jpg`,
          img4: `${base}/products/pigmentation/lumiedge-cream/img4.jpg`,
        },
        lumiedgeTx: {
          img1: `${base}/products/pigmentation/lumiedge-tx/img1.jpg`,
        },
        melaluminUltra: {
          img1: `${base}/products/pigmentation/melalumin-ultra/img1.webp`,
          img2: `${base}/products/pigmentation/melalumin-ultra/img2.webp`,
          img3: `${base}/products/pigmentation/melalumin-ultra/img3.webp`,
        },
        transglowHd: {
          img1: `${base}/products/pigmentation/transglow-hd/img1.webp`,
          img2: `${base}/products/pigmentation/transglow-hd/img2.webp`,
        },
      },
      skinAntioxidant: {
        cwiz: {
          img1: `${base}/products/skin-antioxient/cwiz/img1.jpg`,
        },
        glutasurgeA: {
          img1: `${base}/products/skin-antioxient/flutasurge-a/img1.webp`,
          img2: `${base}/products/skin-antioxient/flutasurge-a/img2.png`,
        },
        glFizz: {
          img1: `${base}/products/skin-antioxient/gl-fizz/img1.jpg`,
        },
        glootamin: {
          img1: `${base}/products/skin-antioxient/glootamin/img1.webp`,
          img2: `${base}/products/skin-antioxient/glootamin/img2.webp`,
        },
        glutasurgeC: {
          img1: `${base}/products/skin-antioxient/glutasurge-c/img1.jpg`,
        },
      },
    },
  },
};

export default Resources;
