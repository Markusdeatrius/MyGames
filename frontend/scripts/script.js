document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('user-form');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:3000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                form.reset();
                alert("Uživatel přidán!");
            } else {
                alert("Chyba při přidávání uživatele.");
            }
        } catch (error) {
            console.error('Chyba:', error);
        }
    });
});
