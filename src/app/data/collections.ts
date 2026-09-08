import { WordCollection } from '../types/models';

const cache = new Map<number, WordCollection>();

async function importLevel(level: number): Promise<WordCollection> {
  switch (level) {
    case 2:
      return (await import('./wordCollectionLevel2'))
        .sources2 as WordCollection;
    case 3:
      return (await import('./wordCollectionLevel3'))
        .sources3 as WordCollection;
    case 4:
      return (await import('./wordCollectionLevel4'))
        .sources4 as WordCollection;
    case 5:
      return (await import('./wordCollectionLevel5'))
        .sources5 as WordCollection;
    case 6:
      return (await import('./wordCollectionLevel6'))
        .sources6 as WordCollection;
    default:
      return (await import('./wordCollectionLevel1'))
        .sources1 as WordCollection;
  }
}

export async function loadCollection(level: number): Promise<WordCollection> {
  const cached = cache.get(level);
  if (cached) {
    return cached;
  }
  const collection = await importLevel(level);
  cache.set(level, collection);
  return collection;
}

export function getCollection(level: number): WordCollection {
  const collection = cache.get(level);
  if (!collection) {
    throw new Error(`Word collection for level ${level} is not loaded`);
  }
  return collection;
}

export function getRound(level: number, round: number) {
  const collection = getCollection(level);
  return collection.rounds[round] ?? collection.rounds[0];
}

export function getWordExample(level: number, round: number, sentence: number) {
  return getRound(level, round).words[sentence];
}
