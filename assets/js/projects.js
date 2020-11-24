const github = document.getElementById('profile');

document.addEventListener('DOMContentLoaded', async () => {
  let me = sessionStorage.getItem('profile');

  try {
    if (me) return loadProfile(JSON.parse(me))
  }
  catch(error) {
    console.error(error);
  }

  if (window.fetch) {
      let res = await fetch('https://api.github.com/users/ryzzzen');
      me = await res.json();

      console.log('Downloading GitHub profile');
      console.dir(me)

      sessionStorage.setItem('profile', JSON.stringify(me));
  } else {
      // Faire quelque chose avec XMLHttpRequest?
  }

  loadProfile(me);
})

function loadProfile(data) {
  document.getElementById('userAvatar').src = data.avatar_url;
  document.getElementById('text').innerText = '"' + data.bio + '"';
  document.getElementById('stats').innerHTML = `${data.followers} followers <span class="color-primary">— suit ${data.following} personnes —</span> ${data.public_repos} repos publics`;

  console.dir(data);
}
