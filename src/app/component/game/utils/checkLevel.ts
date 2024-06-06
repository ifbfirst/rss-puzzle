import { sources1 } from '../../../data/wordCollectionLevel1';
import { sources2 } from '../../../data/wordCollectionLevel2';
import { sources3 } from '../../../data/wordCollectionLevel3';
import { sources4 } from '../../../data/wordCollectionLevel4';
import { sources5 } from '../../../data/wordCollectionLevel5';
import { sources6 } from '../../../data/wordCollectionLevel6';
export function checkLevel(level: number) {
  let sources;
  switch (level) {
    case 1:
      sources = sources1;
      break;
    case 2:
      sources = sources2;
      break;
    case 3:
      sources = sources3;
      break;
    case 4:
      sources = sources4;
      break;
    case 5:
      sources = sources5;
      break;
    case 6:
      sources = sources6;
      break;
    default:
      sources = sources1;
  }
  return sources;
}
