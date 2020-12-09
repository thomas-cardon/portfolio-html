const LoadingQ = {
  _array: [],
  push: (f, self = undefined, ...args) => LoadingQ._array.push([f, self, args]),
  showPage: () => {
    Array.from(document.querySelectorAll('.hide')).forEach(el => el.classList.remove('hide'));
    document.getElementById('loading').style.display = 'none';
  },
  hidePage: () => {
    document.getElementById('loading').style.display = 'block';
  }
}

/*
* Cette fonction me permet de charger les fonctions que je veux dans le bon ordre
* et d'ensuite appeler les fonctions i18n
* pour: -> traduire une fois que les scripts qui changent le DOM au lancement ont été exécutés
*       -> enlever l'overlay de chargement avec le spinner une fois que la page à finit de charger
*/
document.addEventListener('DOMContentLoaded', async () => {
  await i18n.load();

  for (a of LoadingQ._array) {
    console.log('LoadingQ >> Loading:', a[0].name),
    await a[0].call(a[1] /* thisArg */, ...a[2] /* args */);
  }

  delete LoadingQ._array;

  await i18n.updateDOM();

  console.log('>> Showing Page');
  LoadingQ.showPage();
});
