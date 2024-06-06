export class CheckHelper {
  static checkCache() {
    if (localStorage.getItem('name') === null) {
      return true;
    } else {
      return false;
    }
  }
}
