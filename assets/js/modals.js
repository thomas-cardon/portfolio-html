LoadingQ.push(async () => {

  Array.from(document.querySelectorAll('.modal'))
  .forEach(el => {
    el.onclick = () => el.style.display = "none";
  });
  
});

function hitModal(img, modal = img.nextElementSibling) {
  console.dir(img);
  console.dir(modal);
  
  modal.style.display = "block";
  modal.style.opacity = "1";
  
  modal.children[0].src = img.style.backgroundImage.slice(5, -2);
  modal.children[1].innerText = img.attributes.alt.value;
}