// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB8XsXbSwpFjObPxEUslTPsuTphljbrFNo",
    authDomain: "trash-627ac.firebaseapp.com",
    projectId: "trash-627ac",
    storageBucket: "trash-627ac.appspot.com",
    messagingSenderId: "214970255650",
    appId: "1:214970255650:web:83590b21ec962d5d28bd7b",
    measurementId: "G-YKZPJX6MDX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Your existing code for the trash system
const candidates = ['Armaan', 'Navdeep', 'Khushi', 'Anya', 'Ananya', 'Amulya'];
const timeline = document.getElementById('timeline');

const progressLine = document.createElement('div');
progressLine.className = 'progress-line';
timeline.appendChild(progressLine);

candidates.forEach(candidate => {
    const nameDiv = document.createElement('div');
    nameDiv.className = 'name';
    nameDiv.textContent = candidate;
    nameDiv.onclick = function() {
        // Update the trash status for this candidate
        set(ref(database, 'trash/lastCleared'), candidate);
    };

    const dashDiv = document.createElement('div');
    dashDiv.className = 'dash';

    nameDiv.appendChild(dashDiv);
    timeline.appendChild(nameDiv);
});


onValue(ref(database, 'trash/lastCleared'), (snapshot) => {
    const lastClearedBy = snapshot.val();
    let clearedIndex = candidates.indexOf(lastClearedBy);

    if (clearedIndex !== -1) {
        // Calculate the percentage
        let percent = ((clearedIndex + 1) / candidates.length) * 100;
        progressLine.style.width = `${percent}%`;
    }

    const nameDivs = document.querySelectorAll('.name');
    nameDivs.forEach(nameDiv => {
        const dash = nameDiv.querySelector('.dash');
        if (nameDiv.textContent === lastClearedBy) {
            dash.style.display = 'inline-block';
            nameDiv.classList.add('last-cleared'); // Add the red background class
        } else {
            dash.style.display = 'none';
            nameDiv.classList.remove('last-cleared'); // Remove the red background class
        }
    });
});