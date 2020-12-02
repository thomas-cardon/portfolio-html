function showPage() {
  Array.from(document.querySelectorAll('.hide')).forEach(el => el.classList.remove('hide'));
  document.getElementById('loading').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => i18n.load().then(i18n => {
    i18n.updateDOM();
    console.log('>> Showing Page');
    showPage();
  })
);

// https://www.w3schools.com/howto/howto_css_loader.asp
