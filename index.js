const input = document.getElementById('input');
const button = document.getElementById('button');

const keyboardCharacters = {
  english: [
    "`1234567890-=qwertyuiop[]\\asdfghjkl;'zxcvbnm,./ ".split(''), // english lowercase
    '~!@#$%^&*()_+QWERTYUIOP{}|ASDFGHJKL:"ZXCVBNM<>?'.split(''), // english uppercase
  ],
  thai: [
    '_ๅ/-ภถุึคตจขชๆไำพะัีรนยบลฃฟหกดเ้่าสวงผปแอิืทมใฝ '.split(''), // thai lowercase
    '%+๑๒๓๔ู฿๕๖๗๘๙๐"ฎฑธํ๊ณฯญฐ,ฅฤฆฏโฌ็๋ษศซ.()ฉฮฺ์?ฒฬฦ'.split(''), // thai uppercase
  ],
};

function detectTranslate(sentence) {
  const sentenceChar = sentence.split('');
  let newSentence = '';

  console.log(keyboardCharacters);

  sentenceChar.forEach((letter) => {
    let language;
    let toLanguage;

    if (keyboardCharacters.english.flat().includes(letter)) {
      language = 'english';
      toLanguage = 'thai';
    } else if (keyboardCharacters.thai.flat().includes(letter)) {
      language = 'thai';
      toLanguage = 'english';
    } else {
      console.error('ERROR : connot detect language');
    }

    console.log('language:', language);

    keyboardCharacters[language].forEach((keyboardCharRow, caseIndex) => {
      let letterIndex = keyboardCharRow.indexOf(letter);
      if (letterIndex != -1) newSentence += keyboardCharacters[toLanguage][caseIndex][letterIndex];
    });
  });

  return newSentence;
}

button.addEventListener('click', () => {
  let translatedSentence = detectTranslate(input.value);
  console.log(translatedSentence);
  navigator.clipboard
    .writeText(translatedSentence)
    .then(() => {
      console.log('Text copied to clipboard!');
    })
    .catch((err) => {
      console.error('Failed to copy text: ', err);
    });
});
