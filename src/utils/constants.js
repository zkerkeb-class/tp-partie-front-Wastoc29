// Constantes de l'application

export const ITEMS_PER_PAGE = 20;

export const POKEMON_TYPES = {
  NORMAL: 'Normal',
  FIRE: 'Fire',
  WATER: 'Water',
  ELECTRIC: 'Electric',
  GRASS: 'Grass',
  ICE: 'Ice',
  FIGHTING: 'Fighting',
  POISON: 'Poison',
  GROUND: 'Ground',
  FLYING: 'Flying',
  PSYCHIC: 'Psychic',
  BUG: 'Bug',
  ROCK: 'Rock',
  GHOST: 'Ghost',
  DRAGON: 'Dragon',
  DARK: 'Dark',
  STEEL: 'Steel',
  FAIRY: 'Fairy'
};

export const TYPE_COLORS = {
  Normal: '#A8A77A',
  Fire: '#EE8130',
  Water: '#6390F0',
  Electric: '#F7D02C',
  Grass: '#7AC74C',
  Ice: '#96D9D6',
  Fighting: '#C22E28',
  Poison: '#A33EA1',
  Ground: '#E2BF65',
  Flying: '#A98FF3',
  Psychic: '#F95587',
  Bug: '#A6B91A',
  Rock: '#B6A136',
  Ghost: '#735797',
  Dragon: '#6F35FC',
  Dark: '#705746',
  Steel: '#B7B7CE',
  Fairy: '#D685AD'
};

export const STAT_LABELS = {
  HP: 'Points de Vie',
  Attack: 'Attaque',
  Defense: 'Défense',
  'Sp. Attack': 'Att. Spé.',
  'Sp. Defense': 'Déf. Spé.',
  Speed: 'Vitesse'
};

export const ROUTES = {
  HOME: '/',
  DETAILS: '/pokemon/:id',
  CREATE: '/create',
  FAVORITES: '/favorites',
  COMPARE: '/compare',
  NOT_FOUND: '*'
};

export const LOCAL_STORAGE_KEYS = {
  FAVORITES: 'pokemon_favorites',
  COMPARE_LIST: 'pokemon_compare_list',
  THEME: 'pokemon_theme'
};
