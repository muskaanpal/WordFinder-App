const form = document.querySelector('form');
const resultDiv = document.querySelector('.result');

form.addEventListener('submit', (e)=> {
    e.preventDefault();
    getWordInfo(form.elements[0].value);
});

const getWordInfo = async (word) => {
    try {
        resultDiv.innerHTML = "Fetching Data...";
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = await response.json();

        let definitions = data[0].meanings[0].definitions[0];
        
        resultDiv.innerHTML = `
        <h2><strong>Word:</strong> ${data[0].word}</h2>
        <p class="partOfSpeech">${data[0].meanings[0].partOfSpeech}</p>
        <p><strong>Meaning:</strong> ${definitions.definition || "Not Found"}</p>
        <p><strong>Example:</strong> ${definitions.example || "Not Found"}</p>
        
        <p><strong>Antonyms:</strong></p>
        `;

        // 🔹 Antonyms
        if (!definitions.antonyms || definitions.antonyms.length === 0) {
            resultDiv.innerHTML += `<span>Not Found</span>`;
        } else {
            definitions.antonyms.forEach(ant => {
                resultDiv.innerHTML += `<li>${ant}</li>`;
            });
        }

        // 🔹 Synonyms
        resultDiv.innerHTML += `<p><strong>Synonyms:</strong></p>`;
        if (!definitions.synonyms || definitions.synonyms.length === 0) {
            resultDiv.innerHTML += `<span>Not Found</span>`;
        } else {
            definitions.synonyms.forEach(syn => {
                resultDiv.innerHTML += `<li>${syn}</li>`;
            });
        }

        // 🔹 Source
        resultDiv.innerHTML += `<div><a href="${data[0].sourceUrls}" target="_blank">Read More</a></div>`;

        console.log(data);
    }
    catch (error) {
        resultDiv.innerHTML = `<p>Sorry, the word could not be found</p>`;
        console.error(error);
    }
};