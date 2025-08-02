// Sample carousel functionality
const sampleEntries = [
    {
        section: "Security",
        term: "Least Privileges",
        sounds: "Minimized risk access",
        meaning: "If you can do your job - we failed at ours"
    },
    {
        section: "Corpo Survival Tactics",
        term: "Adding X for visibility",
        sounds: "Keeping stakeholders informed",
        meaning: "Deploying subtle pressure via CC"
    },
    {
        section: "Stakeholders",
        term: "I trust the team",
        sounds: "Giving full autonomy",
        meaning: "I don't want to think this through - and I won't be the one blamed"
    },
    {
        section: "Stand-up Monastery",
        term: "Today I will...",
        sounds: "Clear daily commitment",
        meaning: "An optimistic fantasy that ignores your calendar and Slack chaos"
    },
    {
        section: "The Governance Labyrinth",
        term: "Please submit a request via the portal",
        sounds: "Centralized efficiency",
        meaning: "Abandon all hope. And your afternoon"
    }
];

let currentSampleIndex = 0;

function updateSampleEntry(index) {
    const entry = sampleEntries[index];
    document.getElementById('sampleSection').textContent = entry.section;
    document.getElementById('sampleTerm').textContent = entry.term;
    document.getElementById('sampleSounds').textContent = entry.sounds;
    document.getElementById('sampleMeaning').textContent = entry.meaning;

    // Update dots
    document.querySelectorAll('.sample-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

function nextSampleEntry() {
    currentSampleIndex = (currentSampleIndex + 1) % sampleEntries.length;
    updateSampleEntry(currentSampleIndex);
}

// Tab Switching Functionality
document.addEventListener('DOMContentLoaded', function () {
    const tabButtons = document.querySelectorAll('.tab-button');

    // Check for URL parameter on page load
    const urlTab = getUrlParameter('tab');
    if (urlTab && ['book', 'subscribe', 'amazon', 'media'].includes(urlTab)) {
        switchToTab(urlTab);
    }

    // Also check for legacy parameter names for flexibility
    const legacyParams = ['subscribe', 'amazon', 'book', 'media'];
    legacyParams.forEach(param => {
        if (getUrlParameter(param) !== null) {
            switchToTab(param);
        }
    });

    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            const targetTab = this.getAttribute('data-tab');
            switchToTab(targetTab);
            updateUrl(targetTab);
        });
    });

    // Sample carousel auto-rotation
    setInterval(nextSampleEntry, 20000); // Change every 20 seconds

    // Sample carousel click to advance
    document.getElementById('sampleCarousel').addEventListener('click', nextSampleEntry);

    // Dot navigation
    document.querySelectorAll('.sample-dot').forEach(dot => {
        dot.addEventListener('click', function (e) {
            e.stopPropagation();
            const index = parseInt(this.getAttribute('data-index'));
            currentSampleIndex = index;
            updateSampleEntry(index);
        });
    });
});

// Smooth scrolling for mobile
if (window.innerWidth <= 768) {
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('click', function () {
            document.querySelector('.tab-content').scrollTop = 0;
        });
    });
}

function switchToTab(tabName) {
    // Remove active class from all buttons and panes
    document.querySelectorAll('.tab-button').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));

    // Add active class to target button and pane
    const targetButton = document.querySelector(`[data-tab="${tabName}"]`);
    const targetPane = document.getElementById(tabName);

    if (targetButton && targetPane) {
        targetButton.classList.add('active');
        targetPane.classList.add('active');
        return true;
    }
    return false;
}

function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

function updateUrl(tabName) {
    const url = new URL(window.location);
    if (tabName === 'book') {
        // Remove parameter for default tab
        url.searchParams.delete('tab');
    } else {
        url.searchParams.set('tab', tabName);
    }
    window.history.replaceState({}, '', url);
}

// Function to download author bio as text file
function downloadAuthorBio() {
    const authorBio = `Adam Korga - Author Biography

Adam Korga is a self-proclaimed writer who has survived 20 years in IT, mostly intact. Using a pen name, he tries not to pull punches — though he does flinch when they come back.

He has been a developer, an architect, a scrum master, and a platform guy. He has worked in startups that moved fast and broke things — and in enterprises that moved slow and broke people.

After nearly 20 years of collecting buzzwords, rituals, and pain (in roughly equal parts), he decided it's time someone documented the madness — with just enough irony to survive.

Adam is the author of "IT Dictionary: A Survival Manual for the Tech Circus," a brutally honest guide to tech jargon across 1,666 entries spanning five painfully accurate realms of modern IT culture.

Contact: contact@adamkorga.com
LinkedIn: https://www.linkedin.com/in/adam-korga/
Facebook: https://www.facebook.com/adamkorga.author`;

    const blob = new Blob([authorBio], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'adam-korga-author-bio.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}