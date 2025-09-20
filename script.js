// Array of fun facts
const funFacts = [
    "I love economics and finance",
    "I have experience in Python, C++, and Java",
    "I enjoy learning new technologies",
    "I'm building my first website with GitHub Pages"
];

// Function to display a random fun fact
function showFunFact() {
    const randomIndex = Math.floor(Math.random() * funFacts.length);
    document.getElementById("fun-fact").innerText = funFacts[randomIndex];
}
