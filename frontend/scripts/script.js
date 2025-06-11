let menuBtn = document.querySelector('#menu-btn')
let header = document.querySelector('.header')

menuBtn.onclick = () => {
    navbar.classList.toggle('active')
    menuBtn.classList.toggle('fa-times')
}

window.onscroll = () => {
    navbar.classList.remove('active')
    menuBtn.classList.remove('fa-times')

    if(window.scrollY > 0){
        header.classList.add('active')
    }else {
        header.classList.remove('active')
    }
}

// Načtení dat při načtení stránky
document.addEventListener('DOMContentLoaded', () => {
    fetchUsers();
});



// Přidání novevého usera
document.getElementById('body').addEventListener('submit', async (e) => { //nemelo by byt kvuli db async
    e.preventDefault();
    const name = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    try {
        const response = await fetch('http://localhost:3000/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, password })
        });
        
        if (response.ok) {
            document.getElementById('body').reset();
            fetchUsers();
        } else {
            alert('Chyba při přidávání usera');
        }
    } catch (error) {
        console.error('Chyba:', error);
    }
});

document.getElementById('body').addEventListener('')