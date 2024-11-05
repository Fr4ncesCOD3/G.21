// Funzione principale per inizializzare i pulsanti di nascondi/mostra
const initializeHideButtons = function() {
    // Array delle sezioni da gestire con relativi ID e titoli
    const sections = [
        { id: 'saldi', title: 'Nascondi sezione Saldi' },
        { id: 'welcome-summer', title: 'Nascondi sezione Summer' }
    ];

    // Gestisce il click sul pulsante toggle
    const handleButtonClick = function(sectionContent, hideButton, sectionId) {
        // Alterna la classe d-none per mostrare/nascondere
        sectionContent.classList.toggle('d-none');
        // Aggiorna il testo del pulsante in base allo stato
        hideButton.textContent = sectionContent.classList.contains('d-none')
            ? `Mostra sezione ${sectionId === 'saldi' ? 'Saldi' : 'Summer'}`
            : `Nascondi sezione ${sectionId === 'saldi' ? 'Saldi' : 'Summer'}`;
    };

    // Configura gli event listener per ogni sezione
    const setupSection = function(section) {
        const targetSection = document.getElementById(section.id);
        if (targetSection) {
            // Trova il pulsante e il contenuto della sezione
            const hideButton = targetSection.querySelector('.btn-outline-dark');
            const sectionContent = targetSection.querySelector('.row');
            // Aggiunge l'event listener al pulsante
            hideButton.addEventListener('click', function() {
                handleButtonClick(sectionContent, hideButton, section.id);
            });
        }
    };

    // Applica la configurazione a tutte le sezioni
    sections.forEach(setupSection);
};

// Inizializza quando il DOM è completamente caricato
document.addEventListener('DOMContentLoaded', initializeHideButtons);

// Funzione per contare i viaggi disponibili
const initializeCountFunction = function() {
    const contaViaggi = function() {
        // Conta tutte le card delle destinazioni
        const cardsCount = document.querySelectorAll('.card').length;
        // Conta tutte le immagini nella sezione last-minute
        const lastMinuteCount = document.querySelectorAll('#last-minute img').length;
        // Somma totale
        const totaleViaggi = cardsCount + lastMinuteCount;
        
        alert(`Numero totale di viaggi disponibili: ${totaleViaggi}`);
    };

    // Aggiunge il bottone alla navbar
    const setupCountButton = function() {
        const navbarNav = document.querySelector('.navbar-nav');
        const countButton = document.createElement('li');
        countButton.className = 'nav-item';
        countButton.innerHTML = `
            <button class="btn btn-link nav-link" onclick="contaViaggi()">
                Conta Viaggi
            </button>
        `;
        navbarNav.appendChild(countButton);
    };

    // Rende la funzione disponibile globalmente
    window.contaViaggi = contaViaggi;
    setupCountButton();
};

// Funzione per rimuovere le cards
const initializeRemoveFunction = function() {
    const rimuoviCards = function() {
        // Rimuovi tutte le card
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => card.remove());
        
        // Rimuovi anche le immagini last-minute
        const lastMinuteImages = document.querySelectorAll('#last-minute img');
        lastMinuteImages.forEach(img => img.remove());
    };

    // Aggiunge il bottone alla navbar
    const setupRemoveButton = function() {
        const navbarNav = document.querySelector('.navbar-nav');
        const removeButton = document.createElement('li');
        removeButton.className = 'nav-item';
        removeButton.innerHTML = `
            <button class="btn btn-link nav-link" onclick="rimuoviCards()">
                Rimuovi Cards
            </button>
        `;
        navbarNav.appendChild(removeButton);
    };

    // Rende la funzione disponibile globalmente
    window.rimuoviCards = rimuoviCards;
    setupRemoveButton();
};

// Funzione per gestire il form di contatto
const initializeContactForm = function() {
    const handleFormSubmit = function(e) {
        e.preventDefault();
        
        const form = document.getElementById('contactForm');
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }
        
        // Se il form è valido
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        alert('Messaggio inviato con successo!');
        // Chiudi il modale
        const modal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
        modal.hide();
        // Reset form
        form.reset();
        form.classList.remove('was-validated');
    };

    // Configura l'event listener per il form
    const setupForm = function() {
        const submitButton = document.querySelector('.modal-footer .btn-info');
        submitButton.addEventListener('click', handleFormSubmit);
    };

    setupForm();
};

// Inizializza tutte le funzioni quando il DOM è caricato
document.addEventListener('DOMContentLoaded', function() {
    initializeHideButtons();
    initializeCountFunction();
    initializeRemoveFunction();
    initializeContactForm();
});
