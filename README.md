# phonoExcercise 🎙️

[My Website](https://pepahrebec.github.io/phono_excercise/).

## Motivation

This website was, for a change, made somewhat out of necessity. I've happened to come across the subject of "phonetics" during my English studies, a fairly tough subject. As the semester went by, me and my classmates struggled to find a fitting way to practice phonetic transcriptions, so I ended up creating this SPA as a way to help me and my friends.

## How the website works

The concept of the website is relatively simple. The user clicks the "New Word" button, which triggers a custom hook. This hook generates a random word through the random-word package and then call the FD API with said word, which returns a JSON containing the transcription. This transcription is then compared to the one entered by the user.  
A relatively simple loop is somewhat complicated by the API, which tends to behave in a somewhat unpredictable way. These issues, such as somewhat "fuzzy" JSON structure or unpredictable error returns, are completely mitigated, sadly sometimes leading a longer loading time on a repeated call to the API. Despite this, the website works as well as it can, living off an entirely free API. Frankly, most of code transforms the fetched JSON in certain ways, sometimes replacing "odd" phonetic symbols into the more mainstream ones, removing duplicates or splitting words hidden behind brackets.

## Visual showcase

![Website showcase](/phonoGif.gif)

## Technologies used

- React
- TypeScript
- Vanilla Extract
- Vite
- [Free Dictionary API](https://dictionaryapi.dev/) - Special thanks to the Free Dictionary API, without which this entire project wouldn't be feasible.
- random-words Node Package
