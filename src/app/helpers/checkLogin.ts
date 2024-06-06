export function checkCache(): boolean {
  if (!localStorage.getItem('name')) {
    return true;
  } else {
    return false;
  }
}
