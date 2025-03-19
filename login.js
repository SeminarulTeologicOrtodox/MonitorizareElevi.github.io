// Configurația Firebase (înlocuiește cu datele tale)
const firebaseConfig = {
    apiKey: "AIzaSyDlpKqNqit9is-d6k092AQxcqjnVnRSJ_8",
    authDomain: "monitorizare-elevi-stoc-439e2.firebaseapp.com",
    projectId: "monitorizare-elevi-stoc-439e2",
    storageBucket: "monitorizare-elevi-stoc-439e2.firebasestorage.app",
    messagingSenderId: "130453307665",
    appId: "1:130453307665:web:c0b1b37ce661980f440cb0",
    measurementId: "G-1NNDKTXLH1"
};

// Inițializează Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(); // Inițializează Firestore

// Funcția de login
function login() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const role = document.getElementById('role').value;
    const rememberMe = document.getElementById('remember').checked; // Verifică dacă "Nu mă deconecta" este bifat
    const errorMessage = document.getElementById('error-message');

    // Resetează mesajul de eroare
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';

    // Validare câmpuri
    if (!username || !password) {
        errorMessage.textContent = 'Te rog completează toate câmpurile!';
        errorMessage.style.display = 'block';
        return;
    }

    // Verifică dacă există un utilizator cu username-ul, parola și rolul introduse
    db.collection('utilizatori')
        .where('username', '==', username)
        .where('parola', '==', password)
        .where('rol', '==', role)
        .get()
        .then((querySnapshot) => {
            if (!querySnapshot.empty) {
                // Autentificare reușită
                const userDoc = querySnapshot.docs[0];
                const userData = userDoc.data();
                console.log('Utilizator găsit:', userData);

                // Salvează starea de autentificare în localStorage dacă "Nu mă deconecta" este bifat
                if (rememberMe) {
                    localStorage.setItem('isAuthenticated', 'true');
                    localStorage.setItem('username', username);
                    localStorage.setItem('role', role);
                }

                // Redirecționează către pagina principală
                window.location.href = 'Pagina Principala/Pagina Principala.html';
            } else {
                // Autentificare eșuată
                errorMessage.textContent = 'Username, parolă sau rol incorect.';
                errorMessage.style.color = 'red';
                errorMessage.style.display = 'block';
            }
        })
        .catch((error) => {
            // Eroare la interogarea bazei de date
            errorMessage.textContent = 'A apărut o eroare. Încearcă din nou.';
            errorMessage.style.color = 'red';
            errorMessage.style.display = 'block';
            console.error('Eroare la interogarea Firestore:', error);
        });
}