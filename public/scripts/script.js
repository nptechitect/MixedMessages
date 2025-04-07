
/* Loading phrases from JSON file */
async function getPhrases() {
    const fileContents = await fetch('/scripts/data/phrases.json')
        .then(response => response.json());
    console.log(fileContents);
    return fileContents;
}

// Function to get a random number between 0 and max (exclusive)
function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

// Function to get a random phrase from the loaded phrases
async function getRandomPhrase() {
    // Load the phrases from the JSON file
    const phrases = await getPhrases();
    
    // Get a random index for the category based on the length of the phrases array
    const categoryIndex = getRandomNumber(phrases.length);
    const category = phrases[categoryIndex];

    console.log("Random Category Index: ", categoryIndex);
    console.log("Getting random phrase from category: ", phrases[categoryIndex].category);
    
    // Get a random index for the phrase within the selected category
    const phraseIndex = getRandomNumber(category.phrases.length);
    const phrase = category.phrases[phraseIndex];
    console.log("Random Phrase Index: ", phraseIndex);
    console.log("Random Phrase: ", phrase);

    // Get a random index for the phrase filler within the selected phrase
    const fillerIndex = getRandomNumber(phrase.fillers.length);
    const filler = phrase.fillers[fillerIndex];
    console.log("Random Filler Index: ", fillerIndex);
    console.log("Random Filler: ", filler);

    // construct the final phrase with the filler
    const finalPhrase = phrase.text.replace("{filler}", filler);
    console.log("Final Phrase: ", finalPhrase);

    return finalPhrase;
}

// function to display the random phrase in the HTML element with id "message"
async function displayRandomPhrase() {
    const phrase = await getRandomPhrase();
    document.getElementById("message").innerHTML = phrase;
}

// function to copy the displayed phrase to the clipboard
function copyToClipboard() {
    const messageElement = document.getElementById("message");
    const phraseToCopy = messageElement.innerText;
    
    navigator.clipboard.writeText(phraseToCopy)
        .then(() => {
            console.log('Phrase copied to clipboard:', phraseToCopy);
        })
        .catch(err => {
            console.error('Error copying phrase to clipboard:', err);
        });
}