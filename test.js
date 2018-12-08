//require('./util');

//console.log('JuscelinoFernandes'.toUnderscore());
//console.log('GabrielaSilva'.toUnderscore());
//console.log('GiuLeggiJunior'.toUnderscore());
//console.log('João Batista'.toUnderscore());
//console.log('Pedro_Bassani'.toUnderscore());
//console.log('Célia Garbosa'.toUnderscore());
//console.log('Mariá Dos Santos'.toUnderscore());
//console.log('Caiu do Poço'.toUnderscore());
//console.log('Ê macarena'.toUnderscore());
//console.log('$macarena'.toUnderscore());
//console.log('maca#rena'.toUnderscore());

//console.log('JoãoFrederico'.toCamelCase());

//console.log(
//    'João_vitor TesteDAHORA'.toCamelCase()
//);
//console.log('UNDERSCORE_TO_camelCase'.toCamelCase());
//console.log('Common to camel-case'.toCamelCase());
//console.log('TesTe'.searchAll('T'));

const testFolder = './';
const fs = require('fs');

fs.readdirSync(testFolder).forEach(file => {
  console.log(file);
});