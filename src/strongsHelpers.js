/**
 * ugntHelpers.js - this is the code called by ugntParse.js to download and convert greek resources (was BHP and now
 *                  UGNT.
 */

import path from 'path-extra';
import fs from 'fs-extra';
const convert = require('html-to-json-data');
const { group, text, number, href, src, attr } = require('html-to-json-data/definitions');

const outputPath = path.join(__dirname, '../resources/en/lexicons/uhl');


/**
 * @description - generates UGNT for each book from github and split into chapters and saves under version.
 * @param {function} resolve - callback when finished
 */
export async function generateStrongsFiles(version) {
  const versionPath = path.join(outputPath, version);
  const inputPath = path.join(__dirname, '../DictBDB.json');
  const dictBDB = fs.readJsonSync(inputPath);
  for (let i = 0, len = dictBDB.length; i < len; i++) {
    const item = dictBDB[i];
    const {top: strongs, def} = item;
    const data = convert('<html>' + def + '</html>', {
        hebrew: text('ref0.word > font'),
        strongs: text('div > p > b')
      }
    );
    console.log("data= " + data);
  }
  console.log(`Parsing Strongs`);
}

