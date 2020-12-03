const github = document.getElementById('profile');
window.me = {};

function loadProfile() {
  return new Promise((resolve, reject) => {
    document.getElementById('userAvatar').onload = function() {
      console.log('Avatar >> loaded');
      resolve();
    }

    document.getElementById('userAvatar').src = me.avatar_url;
    document.getElementById('text').innerText = `"${me.bio}"`;
    document.getElementById('stats').innerHTML = `${me.followers} {{github.followers}} <i class="fas fa-user-friends"></i> <span class="color-primary">— {{github.follows}} ${me.following} {{people}} <i class="fas fa-users"></i> —</span> ${me.public_repos} {{github.repo.public}} <i class="fas fa-code-branch"></i>`;
  });
};

LoadingQ.push(async () => {
  let data = sessionStorage.getItem('profile');

  try {
    if (me) me = JSON.parse(data);
  }
  catch(error) {
    console.error(error);
  }

  if (window.fetch) {
    let res = await fetch('https://api.github.com/users/ryzzzen');
    me = await res.json();

    console.log('>> Téléchargement du profil GitHub');
    console.dir(me)

    sessionStorage.setItem('profile', JSON.stringify(me));
  }
  else {
    console.log('>> Impossible de télécharger profil GitHub');
  }
});

LoadingQ.push(loadProfile);
