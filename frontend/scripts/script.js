document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('user-form');
  const loginBtn = document.getElementById('login-btn');
  const registerBtn = document.getElementById('register-btn');

  // Registrace
  if (registerBtn) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      try {
        const res = await fetch('http://localhost:3000/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });

        if (res.ok) {
          window.location.href = "/pages/logIn.html";
        } else {
          alert('Chyba při registraci.');
        }
      } catch (err) {
        console.error('Chyba:', err);
      }
    });
  }

  // Přihlášení
  if (loginBtn) {
    loginBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      try {
        const res = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
          credentials: 'include'
        });

        const data = await res.json();

        if (res.ok && data.success) {
          window.location.href = "/pages/frontP.html";
        } else {
          alert(data.message || 'Přihlášení se nezdařilo.');
        }
      } catch (err) {
        console.error('Chyba:', err);
      }
    });
  }
});
