import mutateObject from "../../helpers/mutate-object";

const keyArr = [];
const randomKey = () => {
  const number = Math.floor(Math.random() * 100001);
  if (keyArr.includes(number)) {
    return randomKey();
  }

  keyArr.push(number);
  return number;
};

const mapSamples = data => {
  const categories = [];

  // Loop Categories
  for (var i = 0; i < data.length; i++) {
    const currentCategory = data[i];

    const category = {
      _key: randomKey(),
      slug: currentCategory.slug,
      name: currentCategory.name,
      samples: []
    };

    // Loop Packs to extract samples
    for (var ii = 0; ii < currentCategory.packs.length; ii++) {
      const currentPack = currentCategory.packs[ii];

      // Loop samples and add to Category samples
      for (var iii = 0; iii < currentPack.samples.length; iii++) {
        const currentSample = currentPack.samples[iii];

        if (!currentSample.file) continue;

        const pack = {
          _key: randomKey(),
          slug: currentSample.slug,
          name: currentSample.name,
          pack: currentPack.name,
          active: true,
          file: currentSample.file.asset._ref
            .replace("file-", "https://cdn.sanity.io/files/d5o9qdi6/production/")
            .replace("-mp3", ".mp3")
            .replace("-wav", ".wav"),
          effects: [
            {
              _unique: 236472,
              name: "delay",
              test: 1,
              properties: {
                _unique: 236472,
                delayTime: 0,
                wet: 0,
                feedback: 0
              }
            }
          ]
        };

        category.samples.push(pack);
      }
    }

    categories.push(category);
  }

  return categories;
};

export const mapSettingsFromData = data => {
  const store = {};

  // Loops
  store.loops = [];

  // Cue Loop
  store.cueLoop = {
    _key: randomKey(),
    isLooping: false,
    loopTime: null
  };

  // Functions
  store.functions = {
    mutateObject: mutateObject
  };

  // Settings
  store.settings = {
    categories: mapSamples(data)
  };

  return store;
};
