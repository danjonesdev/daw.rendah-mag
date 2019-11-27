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

const mapSettings = data => {
  console.log("data", data);

  const categories = [];

  // Loop Categories
  for (var i = 0; i < data.length; i++) {
    const currentCategory = data[i];
    console.log("currentCategory", currentCategory);

    const category = {
      slug: currentCategory.slug,
      name: currentCategory.name,
      samples: []
    };

    // Loop Packs to extract samples
    for (var ii = 0; ii < currentCategory.packs.length; ii++) {
      const currentPack = currentCategory.packs[ii];
      console.log("currentPack", currentPack);

      // Loop samples and add to Category samples
      for (var iii = 0; iii < currentPack.samples.length; iii++) {
        const currentSample = currentPack.samples[iii];
        console.log("currentSample", currentSample);

        const pack = {
          slug: currentSample.slug,
          name: currentSample.name,
          pack: currentPack.name
        };

        category.samples.push(pack);
      }
    }

    categories.push(category);
  }

  console.log("categories", categories);

  return categories;
};

export const mapSettingsFromData = data => {
  const settings = {};

  // Loops
  settings.loops = [];

  // Cue Loop
  settings.cueLoop = {
    _key: randomKey(),
    isLooping: false,
    loopTime: null
  };

  // Functions
  settings.functions = {
    mutateObject: mutateObject
  };

  // Settings
  settings.settings = mapSettings(data);

  return settings;
};
