const rawText = `
A a	A a
Б б	B b
В в	V v
Г г	G g
Д д	D d
Е е	E e
Ё ё	Yo yo
Ж ж	Zh zh
З з	Z z
И и	I i
Й й	J j
К к	K k
Л л	L l
М м	M m
Н н	N n
О о	O o
П п	P p
Р р	R r
С с	S s
Т т	T t
У у	U u
Ф ф	F f
Х х	H h
Ц ц	Ts ts
Ч ч	Ch ch
Ш ш	Sh sh
Щ щ	Shch shch
Ъ ъ	'
Ы ы	Y y
Ь ь	'
Э э	E e
Ю ю	Yu yu
Я я	Ya ya
`;

const lines = rawText.split('\n').filter(line => line.length !== 0);
const translations = lines.map(line => {
  // Break each line (eg. 'A a\tA a') into an object
  // like { cyrilic: [A, a], latin: [A, a] }.
  // Special case: Sometimes, multiple cyrilic chars only have one
  // common latin equivalent. eg. "Ь ь	'".
  const parts = line.split('\t');
  const cyrilicChars = parts[0].split(' ');
  const latinChars = parts[1].split(' ');
  const onlyLowercaseLatinChar =
    latinChars.length === 2 ? latinChars[1] : latinChars[0];
  return {
    cyrilic: [...cyrilicChars],
    latin: [onlyLowercaseLatinChar]
  };
});

const cyrilicToLatin = cyrilicInput =>
  cyrilicInput.split('').reduce((acc, cyrilicChar) => {
    let latinCharToBeConcatenated = '';
    translations.map(translation => {
      // If it (cyrilicChar)'s present in the current translation
      if (translation.cyrilic.indexOf(cyrilicChar) !== -1) {
        latinCharToBeConcatenated = translation.latin[0];
      }
    });
    // If it isn't a cyrilic char (eg. comma, dot), let it slide
    if (latinCharToBeConcatenated === '') {
      latinCharToBeConcatenated = cyrilicChar;
    }
    return acc + latinCharToBeConcatenated;
  }, '');

console.log(cyrilicToLatin('октарин с радиком, алхимик'));

module.exports = {
  cyrilicToLatin,
  latinToCyrilic: 'Kappa'
};
