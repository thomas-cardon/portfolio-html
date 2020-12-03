const LoadingQ = {
  _array: [],
  push: (f, self = undefined, ...args) => LoadingQ._array.push([f, self, args]),
  showPage: () => {
    Array.from(document.querySelectorAll('.hide')).forEach(el => el.classList.remove('hide'));
    document.getElementById('loading').style.display = 'none';
  }
}
document.addEventListener('DOMContentLoaded', async () => {
  for (a of LoadingQ._array) {
    console.log('LoadingQ >> Loading:', a[0].name),
    await a[0].call(a[1] /* thisArg */, ...a[2] /* args */)
  }

  delete LoadingQ._array;

  console.log('>> Showing Page');
  LoadingQ.showPage();
});
