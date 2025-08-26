const accessories = require('./store.json');
const fs = require('fs');
const TYPES = {
  ACCESSORY: 'A',
  STATION: 'S',
  INGREDIENT: 'I',
  POTION: 'P',
};

const pipe = (first, ...more) =>
  more.reduce(
    (acc, curr) =>
      (...args) =>
        curr(acc(...args)),
    first
  );

const objToArr = obj => Object.values(obj);
const arrayToObj = arr =>
  arr.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});
const sortById = arr =>
  arr.sort((a, b) => {
    if (a.id < b.id) return -1;
    if (a.id > b.id) return 1;
    return 0;
  });
const validateAccessories = arr => {
  const verifiedIds = new Set();
  arr.forEach((a, a_idx) => {
    // main validation
    if (!a) {
      throw new Error('provide item, please! ' + a_idx);
    }
    if (typeof a !== 'object') {
      throw new Error('item should be an object! ' + a_idx);
    }
    if (
      !Object.hasOwn(a, 'id') ||
      !Object.hasOwn(a, 'name') ||
      !Object.hasOwn(a, 'path') ||
      !Object.hasOwn(a, 'used_in') ||
      !Object.hasOwn(a, 'recipes') ||
      !Object.hasOwn(a, 'type') ||
      !Object.hasOwn(a, 'effect') ||
      !Object.hasOwn(a, 'obtain') ||
      !Object.hasOwn(a, 'category')
    ) {
      throw new Error('item should contain all required keys! ' + a_idx);
    }
    if (!a.id || !a.name || !a.path) {
      throw new Error('item should contain all required fields! ' + a_idx);
    }
    if (typeof a.id !== 'string') {
      throw new Error('id should be a string! ' + a_idx);
    }
    if (accessories[a.id] || verifiedIds.has(a.id)) {
      throw new Error('id already exists ' + a.id);
    }
    if (typeof a.name !== 'string') {
      throw new Error('name should be a string! ' + a_idx);
    }
    if (typeof a.path !== 'string') {
      throw new Error('path should be a string! ' + a_idx);
    }
    if (!Array.isArray(a.used_in)) {
      throw new Error('used_in should be an array! ' + a_idx);
    }
    if (!Array.isArray(a.recipes)) {
      throw new Error('recipes should be an array! ' + a_idx);
    }
    if (typeof a.type !== 'string') {
      throw new Error('type should be a string! ' + a_idx);
    }
    if (typeof a.effect !== 'string') {
      throw new Error('effect should be a string! ' + a_idx);
    }
    if (typeof a.obtain !== 'string') {
      throw new Error('obtain should be a string! ' + a_idx);
    }
    if (!Array.isArray(a.category)) {
      throw new Error('category should be an array! ' + a_idx);
    }
    if (
      !a.type ||
      !a.type.trim().length ||
      !Object.values(TYPES).includes(a.type)
    ) {
      throw new Error('item should have type (A, S, P or I)! ' + a.id);
    }
    // custom validation
    if (a.id.includes(' ') || a.path.includes(' ')) {
      throw new Error('id/path cannot contain spaces! ' + a.id);
    }
    if (!a.path.includes('.png') && !a.path.includes('.gif')) {
      throw new Error('path should contain valid path to image! ' + a.id);
    }
    if (!fs.existsSync(`../../public/img/${a.path}`)) {
      throw new Error('item should have an image. ' + a.id);
    }
    if (a.id.type === TYPES.ACCESSORY) {
      if (!a.category.length) {
        throw new Error('accessory should have at least 1 category! ' + a.id);
      }
      if (!a.recipe.length && !a.obtain.length) {
        throw new Error(
          'accessory should contain way to obtain it or recipe! ' + a.id
        );
      }
      a.used_in.forEach(u => {
        if (!u || typeof u !== 'string' || !u.length) {
          throw new Error('used_in has empty value! ' + a.id + '>' + u);
        }
        if (!accessories[u]) {
          // eslint-disable-next-line no-console
          console.error(
            "used_in value doesn't exist in database! " + a.id + '>' + u
          );
        }
      });
      a.recipe.forEach(r => {
        if (!r) {
          throw new Error('recipe has empty value! ' + a.id);
        }
        if (typeof r !== 'object') {
          throw new Error('recipe should be an object! ' + a.id);
        }
        if (!Object.hasOwn(r, 'ingredients') || !Object.hasOwn(r, 'stations')) {
          throw new Error(
            'recipe should consist of ingredients and station(-s)! ' + a.id
          );
        }
        if (Array.isArray(r.ingredients)) {
          throw new Error('ingredients should be an array! ' + a.id);
        }
        if (!r.ingredients.length) {
          throw new Error('ingredients cannot be empty! ' + a.id);
        }
        if (Array.isArray(r.stations)) {
          throw new Error('stations should be an array! ' + a.id);
        }
        if (!r.stations.length) {
          throw new Error('stations cannot be empty! ' + a.id);
        }
        r.ingredients.forEach(i => {
          if (!i || (typeof i !== 'string' && Array.isArray(i)) || !i.length) {
            throw new Error(
              'recipe should contain valid ingredients (string or array of strings)! ' +
                a.id
            );
          }
          if (Array.isArray(i)) {
            i.forEach(ii => {
              if (!ii || typeof ii !== 'string' || !ii.length) {
                throw new Error(
                  'recipe should contain valid ingredients (string or array of strings)! ' +
                    a.id
                );
              }
            });
          }
          if (!accessories[i]) {
            // eslint-disable-next-line no-console
            console.error(
              "ingredient doesn't exist in database! " + a.id + '>' + i
            );
          }
        });
        r.stations.forEach(s => {
          if (!s || typeof s !== 'string' || !s.length) {
            throw new Error('stations should contain valid station! ' + a.id);
          }
          if (!accessories[s]) {
            // eslint-disable-next-line no-console
            console.error(
              "station doesn't exist in database! " + a.id + '>' + s
            );
          }
        });
      });
      a.category.forEach(c => {
        if (!c || typeof c !== 'string' || !c.length) {
          throw new Error('category has empty value! ' + a.id + '>' + c);
        }
      });
    }
    if (a.id.type === TYPES.STATION || a.id.type === TYPES.INGREDIENT) {
      if (
        a.category.length ||
        a.used_in.length ||
        a.recipes.length ||
        a.effect.length
      ) {
        throw new Error(
          'all optional field will be ignored for stations or ingredients! ' +
            a.id
        );
      }
    }
    verifiedIds.add(a.id);
  });
};
const addNewItems = arr => {
  const newItems = [
    {
      id: 'daybloom',
      name: 'Daybloom',
      path: 'daybloom.png',
      used_in: [],
      recipes: [],
      type: 'I',
      effect: '',
      obtain: '',
      category: [],
    },
    {
      id: 'moonglow',
      name: 'Moonglow',
      path: 'moonglow.png',
      used_in: [],
      recipes: [],
      type: 'I',
      effect: '',
      obtain: '',
      category: [],
    },
    {
      id: 'blinkroot',
      name: 'Blinkroot',
      path: 'blinkroot.png',
      used_in: [],
      recipes: [],
      type: 'I',
      effect: '',
      obtain: '',
      category: [],
    },
    {
      id: 'waterleaf',
      name: 'Waterleaf',
      path: 'waterleaf.png',
      used_in: [],
      recipes: [],
      type: 'I',
      effect: '',
      obtain: '',
      category: [],
    },
    {
      id: 'deathweed',
      name: 'Deathweed',
      path: 'deathweed.png',
      used_in: [],
      recipes: [],
      type: 'I',
      effect: '',
      obtain: '',
      category: [],
    },
    {
      id: 'shiverthorn',
      name: 'Shiverthorn',
      path: 'shiverthorn.png',
      used_in: [],
      recipes: [],
      type: 'I',
      effect: '',
      obtain: '',
      category: [],
    },
    {
      id: 'fireblossom',
      name: 'Fireblossom',
      path: 'fireblossom.png',
      used_in: [],
      recipes: [],
      type: 'I',
      effect: '',
      obtain: '',
      category: [],
    },
    {
      id: 'placed_bottle',
      name: 'Placed Bottle',
      path: 'placed_bottle.png',
      used_in: [],
      recipes: [],
      type: 'S',
      effect: '',
      obtain: '',
      category: [],
    },
    {
      id: 'alchemy_table',
      name: 'Alchemy Table',
      path: 'alchemy_table.png',
      used_in: [],
      recipes: [],
      type: 'S',
      effect: '',
      obtain: '',
      category: [],
    },
    {
      id: 'bottled_water',
      name: 'Bottled Water',
      path: 'bottled_water.png',
      used_in: [
        // todo all potions
      ],
      recipes: [
        {
          ingredients: ['bottle'],
          stations: ['water', 'or', 'sink'],
        },
      ],
      type: 'P',
      effect: 'Heals 20HP\nInflicts Potion Sickness for 1m',
      obtain: '',
      category: ['Recovery potions'],
    },
    {
      id: 'cooking_pot',
      name: 'Cooking Pot',
      path: 'cooking_pot.png',
      used_in: [],
      recipes: [],
      type: 'S',
      effect: '',
      obtain: '',
      category: [],
    },
    {
      id: 'cauldron',
      name: 'Cauldron',
      path: 'cauldron.png',
      used_in: [],
      recipes: [],
      type: 'S',
      effect: '',
      obtain: '',
      category: [],
    },
    {
      id: 'mushroom',
      name: 'Mushroom',
      path: 'mushroom.png',
      used_in: [
        'bowl_of_soup',
        'lesser_healing_potion',
        'regeneration_potion',
        'restoration_potion',
      ],
      recipes: [],
      type: 'P',
      effect: 'Heals 15HP\nInflicts Potion Sickness for 30s',
      obtain: 'Grass or Hallowed grass on the surface',
      category: ['Recovery potions'],
    },
    {
      id: 'bowl_of_soup',
      name: 'Bowl of Soup',
      path: 'bowl_of_soup.png',
      used_in: [],
      recipes: [
        {
          ingredients: ['mushroom', 'goldfish'],
          stations: ['cooking_pot', 'or', 'cauldron'],
        },
      ],
      type: 'P',
      effect: 'Medium improvements to all stats for 8 minutes',
      obtain: '',
      category: ['Food and drink potions'],
    },
    {
      id: 'lesser_healing_potion',
      name: 'Lesser Healing Potion',
      path: 'lesser_healing_potion.png',
      used_in: ['healing_potion'],
      recipes: [
        {
          ingredients: ['mushroom', ['gel', 'x 2'], ['bottle', 'x 2']],
          stations: ['placed_bottle', 'or', 'alchemy_table'],
        },
      ],
      type: 'P',
      effect: 'Heals 50HP\nInflicts Potion Sickness for 1m',
      obtain:
        'Chest, Wooden Crate, Pearlwood Crate,\nKing Slime, Eye of Cthulhu, Brain of Cthulhu, Eater of Worlds,\nMerchant or Skeleton Merchant (during moon phases 2, 4, 6, and 8) for 3 silver\nPlatforms in the Dungeon',
      category: ['Recovery potions'],
    },
    {
      id: 'regeneration_potion',
      name: 'Regeneration Potion',
      path: 'regeneration_potion.png',
      used_in: [],
      recipes: [
        {
          ingredients: ['bottled_water', 'daybloom', 'mushroom'],
          stations: ['placed_bottle', 'or', 'alchemy_table'],
        },
      ],
      type: 'P',
      effect: 'Provides life regeneration for 8m',
      obtain: 'Golden chests underground',
      category: ['Buff potions'],
    },
    {
      id: 'restoration_potion',
      name: 'Restoration Potion',
      path: 'restoration_potion.png',
      used_in: [],
      recipes: [
        {
          ingredients: ['mushroom', 'glowing_mushroom', 'pink_gel', 'bottle'],
          stations: ['placed_bottle', 'or', 'alchemy_table'],
        },
      ],
      type: 'P',
      effect: 'Heals 90HP\nInflicts Potion Sickness for 45s',
      obtain: 'Shadow Chest',
      category: ['Recovery potions'],
    },
    {
      id: 'goldfish',
      name: 'Goldfish',
      path: 'goldfish.png',
      used_in: [],
      recipes: [],
      type: 'I',
      effect: '',
      obtain: '',
      category: [],
    },
    {
      id: 'gel',
      name: 'Gel',
      path: 'gel.png',
      used_in: [],
      recipes: [],
      type: 'I',
      effect: '',
      obtain: '',
      category: [],
    },
    {
      id: 'bottle',
      name: 'Bottle',
      path: 'bottle.png',
      used_in: [],
      recipes: [],
      type: 'I',
      effect: '',
      obtain: '',
      category: [],
    },
    {
      id: 'glowing_mushroom',
      name: 'Glowing Mushroom',
      path: 'glowing_mushroom.png',
      used_in: [],
      recipes: [],
      type: 'I',
      effect: '',
      obtain: '',
      category: [],
    },
    {
      id: 'pink_gel',
      name: 'Pink Gel',
      path: 'pink_gel.png',
      used_in: [],
      recipes: [],
      type: 'I',
      effect: '',
      obtain: '',
      category: [],
    },
    {
      id: 'healing_potion',
      name: 'Healing Potion',
      path: 'healing_potion.png',
      used_in: [],
      recipes: [
        {
          ingredients: [['lesser_healing_potion', 'x 2'], 'glowing_mushroom'],
          stations: ['placed_bottle', 'or', 'alchemy_table'],
        },
      ],
      type: 'P',
      effect: 'Heals 100HP\nInflicts Potion Sickness for 1m',
      obtain:
        'Any Crates except the Wooden and Pearlwood Crates\nWall of Flesh, Deerclops and Skeletron\npots in Hardmode and pots in the Underworld before Hardmode',
      category: ['Recovery potions'],
    },
    {
      id: 'honeyfin',
      name: 'Honeyfin',
      path: 'honeyfin.png',
      used_in: ['seafood_dinner'],
      recipes: [],
      type: 'P',
      effect: 'Heals 120HP\nInflicts Potion Sickness for 1m',
      obtain: 'Fished in honey',
      category: ['Recovery potions'],
    },
    {
      id: 'seafood_dinner',
      name: 'Seafood Dinner',
      path: 'seafood_dinner.png',
      used_in: [],
      recipes: [
        {
          ingredients: [['flarefin_koi', 'x 2']],
          stations: ['cooking_pot', 'or', 'cauldron'],
        },
        {
          ingredients: [['variegated_lardfish', 'x 2']],
          stations: ['cooking_pot', 'or', 'cauldron'],
        },
        {
          ingredients: [['frost_minnow', 'x 2']],
          stations: ['cooking_pot', 'or', 'cauldron'],
        },
        {
          ingredients: [['hemopiranha', 'x 2']],
          stations: ['cooking_pot', 'or', 'cauldron'],
        },
        {
          ingredients: [['honeyfin', 'x 2']],
          stations: ['cooking_pot', 'or', 'cauldron'],
        },
        {
          ingredients: [['neon_tetra', 'x 2']],
          stations: ['cooking_pot', 'or', 'cauldron'],
        },
        {
          ingredients: [['obsidifish', 'x 2']],
          stations: ['cooking_pot', 'or', 'cauldron'],
        },
        {
          ingredients: [['princess_fish', 'x 2']],
          stations: ['cooking_pot', 'or', 'cauldron'],
        },
        {
          ingredients: [['prismite', 'x 2']],
          stations: ['cooking_pot', 'or', 'cauldron'],
        },
        {
          ingredients: [['specular_fish', 'x 2']],
          stations: ['cooking_pot', 'or', 'cauldron'],
        },
        {
          ingredients: [['stinkfish', 'x 2']],
          stations: ['cooking_pot', 'or', 'cauldron'],
        },
        {
          ingredients: [['ebonkoi', 'x 2']],
          stations: ['cooking_pot', 'or', 'cauldron'],
        },
        {
          ingredients: [['double_cod', 'x 2']],
          stations: ['cooking_pot', 'or', 'cauldron'],
        },
        {
          ingredients: [['damselfish', 'x 2']],
          stations: ['cooking_pot', 'or', 'cauldron'],
        },
        {
          ingredients: [['crimson_tigerfish', 'x 2']],
          stations: ['cooking_pot', 'or', 'cauldron'],
        },
        {
          ingredients: [['chaos_fish', 'x 2']],
          stations: ['cooking_pot', 'or', 'cauldron'],
        },
        {
          ingredients: [['armored_cavefish', 'x 2']],
          stations: ['cooking_pot', 'or', 'cauldron'],
        },
      ],
      type: 'P',
      effect: 'Medium improvements to all stats for 14 minutes',
      obtain: '',
      category: ['Food and drink potions'],
    },
    {
      id: 'flarefin_koi',
      name: 'Flarefin Koi',
      path: 'flarefin_koi.png',
      used_in: [],
      recipes: [],
      type: 'I',
      effect: '',
      obtain: '',
      category: [],
    },
    {
      id: 'variegated_lardfish',
      name: 'Variegated Lardfish',
      path: 'variegated_lardfish.png',
      used_in: [],
      recipes: [],
      type: 'I',
      effect: '',
      obtain: '',
      category: [],
    },
    {
      id: 'frost_minnow',
      name: 'Frost Minnow',
      path: 'frost_minnow.png',
      used_in: [],
      recipes: [],
      type: 'I',
      effect: '',
      obtain: '',
      category: [],
    },
    {
      id: 'hemopiranha',
      name: 'Hemopiranha',
      path: 'hemopiranha.png',
      used_in: [],
      recipes: [],
      type: 'I',
      effect: '',
      obtain: '',
      category: [],
    },
    {
      id: 'neon_tetra',
      name: 'Neon Tetra',
      path: 'neon_tetra.png',
      used_in: [],
      recipes: [],
      type: 'I',
      effect: '',
      obtain: '',
      category: [],
    },
    {
      id: 'obsidifish',
      name: 'Obsidifish',
      path: 'obsidifish.png',
      used_in: [],
      recipes: [],
      type: 'I',
      effect: '',
      obtain: '',
      category: [],
    },
    {
      id: 'princess_fish',
      name: 'Princess Fish',
      path: 'princess_fish.png',
      used_in: [],
      recipes: [],
      type: 'I',
      effect: '',
      obtain: '',
      category: [],
    },
    {
      id: 'prismite',
      name: 'Prismite',
      path: 'prismite.png',
      used_in: [],
      recipes: [],
      type: 'I',
      effect: '',
      obtain: '',
      category: [],
    },
    {
      id: 'specular_fish',
      name: 'Specular Fish',
      path: 'specular_fish.png',
      used_in: [],
      recipes: [],
      type: 'I',
      effect: '',
      obtain: '',
      category: [],
    },
    {
      id: 'stinkfish',
      name: 'Stinkfish',
      path: 'stinkfish.png',
      used_in: [],
      recipes: [],
      type: 'I',
      effect: '',
      obtain: '',
      category: [],
    },
    {
      id: 'ebonkoi',
      name: 'Ebonkoi',
      path: 'ebonkoi.png',
      used_in: [],
      recipes: [],
      type: 'I',
      effect: '',
      obtain: '',
      category: [],
    },
    {
      id: 'double_cod',
      name: 'Double Cod',
      path: 'double_cod.png',
      used_in: [],
      recipes: [],
      type: 'I',
      effect: '',
      obtain: '',
      category: [],
    },
    {
      id: 'damselfish',
      name: 'Damselfish',
      path: 'damselfish.png',
      used_in: [],
      recipes: [],
      type: 'I',
      effect: '',
      obtain: '',
      category: [],
    },
    {
      id: 'crimson_tigerfish',
      name: 'Crimson Tigerfish',
      path: 'crimson_tigerfish.png',
      used_in: [],
      recipes: [],
      type: 'I',
      effect: '',
      obtain: '',
      category: [],
    },
    {
      id: 'chaos_fish',
      name: 'Chaos Fish',
      path: 'chaos_fish.png',
      used_in: [],
      recipes: [],
      type: 'I',
      effect: '',
      obtain: '',
      category: [],
    },
    {
      id: 'armored_cavefish',
      name: 'Armored Cavefish',
      path: 'armored_cavefish.png',
      used_in: [],
      recipes: [],
      type: 'I',
      effect: '',
      obtain: '',
      category: [],
    },
    {
      id: 'honey',
      name: 'Honey',
      path: 'honey.png',
      used_in: [],
      recipes: [],
      type: 'S',
      effect: '',
      obtain: '',
      category: [],
    },
    {
      id: 'water',
      name: 'Water',
      path: 'water.png',
      used_in: [],
      recipes: [],
      type: 'S',
      effect: '',
      obtain: '',
      category: [],
    },
    {
      id: 'sink',
      name: 'Sink',
      path: 'sink.png',
      used_in: [],
      recipes: [],
      type: 'S',
      effect: '',
      obtain: '',
      category: [],
    },
    {
      id: 'bottled_honey',
      name: 'Bottled Honey',
      path: 'bottled_honey.png',
      used_in: [],
      recipes: [
        {
          ingredients: ['bottle'],
          stations: ['honey'],
        },
      ],
      type: 'P',
      effect:
        'Heals 80HP\nInflicts Potion Sickness for 1m\nLife regeneration is increased for 15s',
      obtain: 'Queen Bee',
      category: ['Recovery potions'],
    },
    {
      id: 'greater_healing_potion',
      name: 'Greater Healing Potion',
      path: 'greater_healing_potion.png',
      used_in: ['super_healing_potion'],
      recipes: [
        {
          ingredients: [
            ['bottled_water', 'x3'],
            ['pixie_dust', 'x3'],
            'crystal_shard',
          ],
          stations: ['placed_bottle', 'or', 'alchemy_table'],
        },
      ],
      type: 'P',
      effect:
        'Heals 150HP\nInflicts Potion Sickness for 1m\nLife regeneration is increased for 15s',
      obtain: 'Hardmode bosses and Biome Mimics',
      category: ['Recovery potions'],
    },
    {
      id: 'crystal_shard',
      name: 'Crystal Shard',
      path: 'crystal_shard.png',
      used_in: [],
      recipes: [],
      type: 'I',
      effect: '',
      obtain: '',
      category: [],
    },
    {
      id: 'super_healing_potion',
      name: 'Super Healing Potion',
      path: 'super_healing_potion.png',
      used_in: [],
      recipes: [
        {
          ingredients: [
            ['greater_healing_potion', 'x4'],
            'nebula_fragment',
            'solar_fragment',
            'stardust_fragment',
            'vortex_fragment',
          ],
          stations: ['placed_bottle', 'or', 'alchemy_table'],
        },
      ],
      type: 'P',
      effect: 'Heals 200HP\nInflicts Potion Sickness for 1m',
      obtain: 'Moon Lord',
      category: ['Recovery potions'],
    },
    {
      id: 'lesser_mana_potion',
      name: 'Lesser Mana Potion',
      path: 'lesser_mana_potion.png',
      used_in: ['mana_potion'],
      recipes: [],
      type: 'P',
      effect: 'Restores 20MP',
      obtain: 'Merchant for 1 silver, Platforms in the Dungeon',
      category: ['Recovery potions'],
    },
    {
      id: 'greater_mana_potion',
      name: 'Greater Mana Potion',
      path: 'greater_mana_potion.png',
      used_in: ['super_mana_potion'],
      recipes: [],
      type: 'P',
      effect: 'Restores 200MP',
      obtain: 'Moon Lord',
      category: ['Recovery potions'],
    },
  ];
  validateAccessories(newItems);
  return [...arr, ...newItems];
};

const res = pipe(objToArr, addNewItems, sortById, arrayToObj)(accessories);

fs.writeFileSync('./store.json', JSON.stringify(res));
