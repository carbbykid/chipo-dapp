
// import seededRandom from "./utils";



  const getLayersByTokenIndex = (layers,tokenIndex) =>{
    const seeded = seededRandom({ seed:tokenIndex.toString() });

    const token=[];
    for (const layer of layers) {
      let pickedTrait = pickRandomTrait(layer.images, seeded);
      token.push(pickedTrait);
    }
    return token;
  };

  const pickRandomTrait=(traits, seeded) =>{
    if (!Array.isArray(traits)) {
      return undefined;
    }

    if (traits.length < 1) {
      return undefined;
    }

    const index = weightedRandom(
      traits.map((x) => Number(x.rarity)),
      seeded,
      50
    );

    return traits[index];
  };

  const weightedRandom = (weights, seeded, defaultWeight = 100) => {

    // Taken from https://github.com/justinmahar/random-seed-weighted-chooser
    let cumulative = 0;
    // Add all weights to cumulative, and build an array of each cumulative value.
    // For example, if the weights are [5, 30, 10], this would build an array
    // containing [5, 35, 45], and cumulative=45.
    const ranges = weights.map(
      (weight) => (cumulative += weight >= 0 ? Math.abs(weight) : defaultWeight)
    );
    const selectedValue = seeded.rnd() * cumulative;
    console.log("selectedValue",selectedValue);

    for (let index = 0; index < ranges.length; index++) {
      if (selectedValue < ranges[index]) {
        // console.log("index",index);
        return index;
      }
    }

    return -1;
  };

  function mulberry32(a) {
    return function () {
      var t = (a += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  
  function xmur3(str) {
    for (var i = 0, h = 1779033703 ^ str.length; i < str.length; i++) {
      h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
      h = (h << 13) | (h >>> 19);
    }
    return function () {
      h = Math.imul(h ^ (h >>> 16), 2246822507);
      h = Math.imul(h ^ (h >>> 13), 3266489909);
      return (h ^= h >>> 16) >>> 0;
    };
  }

  const seededRandom = ({ rng = null, seed = "apples" } = {}) => {
    rng = rng || mulberry32(xmur3(seed)());
    const rnd = (lo, hi, defaultHi = 1) => {
      if (hi === undefined) {
        hi = lo === undefined ? defaultHi : lo;
        lo = 0;
      }    
      return rng() * (hi - lo) + lo ;
    };
  
    const rndInt = (lo, hi) =>{
      return Math.floor(rnd(lo, hi, 2));
    } ;
  
    const shuffle = (a) => {
      for (let i = a.length - 1; i > 0; i--) {
        const j = rndInt(i+1);
        const temp = a[i];
        a[i] = a[j];
        a[j] = temp;
      }
      return a;
    };
  
    return { rnd, rndInt, shuffle };
  };


const main = ()=>{
 const traits =[{
   id : 0,
   rare:60
 },
 {
  id : 1,
  rare:20
 },
 {
  id : 2,
  rare:10
 },
 {
  id : 3,
  rare:4
 },
 {
  id : 4,
  rare:3
 },
 {
  id : 5,
  rare:2
 },
 {
  id : 6,
  rare:0.9
 },
 {
  id : 7,
  rare:0.1
 }
];
let i=0;
let tokens =[];
console.log(traits.map((x) => Number(x.rare)));
const seeded = seededRandom('aaaa');
while (i<2000){
 
  const tokenId = weightedRandom(traits.map((x) => Number(x.rare)),seeded,100);
  tokens.push(tokenId);
  i++;
}
console.log("token",JSON.stringify(tokens));

};

// main();
  

export default getLayersByTokenIndex;
