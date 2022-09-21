
import seededRandom from "./utils";



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

    for (let index = 0; index < ranges.length; index++) {
      if (selectedValue < ranges[index]) {
        return index;
      }
    }

    return -1;
  };

  

export default getLayersByTokenIndex;
