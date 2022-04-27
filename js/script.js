const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

function toggleButton() {
  button.disabled = !button.disabled;
}

function speak(joke) {
  VoiceRSS.speech({
    key: '75d343e6014f47bdbaf6629535e8a7db',
    src: joke,
    hl: 'en-us',
    v: 'Linda',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false,
  });
}

async function getJoke() {
  toggleButton();
  const url =
    'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit';
  let joke = '';
  try {
    const response = await fetch(url);
    const data = await response.json();

    data.joke
      ? (joke = data.joke)
      : (joke = `${data.setup} ... ${data.delivery}`);

    speak(joke);
  } catch (error) {
    console.log('There was a problem getting a joke', error);
  }
}

button.addEventListener('click', getJoke);
audioElement.addEventListener('ended', toggleButton);
