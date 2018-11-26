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
  const index = [];

  const inputPath = path.join(__dirname, '../unabridged-BDB-Hebrew-lexicon.csv');
  const dictBDB = fs.readFileSync(inputPath).toString();
  const dictLines = dictBDB.split('\n');
  for (let i = 1, len = dictLines.length; i < len; i++) {
    let dictLine = dictLines[i];
    if (!dictLine) {
      console.warn("Skipping Line: " + dictLine);
      continue;
    }
    const cols = dictLine.split('\t');
    const BDBid = cols[0];
    const strongs = cols[1].split('_');
    const content = cols[2];

    const entry = {
      brief: strongs,
      long: content
    };

    for (let j= 0, sLen = strongs.length; j < sLen; j++) {
      const strongsNum = strongs[j].substr(1);
      if (strongsNum) {
        const filePath = path.join(versionPath, 'content', strongsNum + ".json");
        fs.outputJsonSync(filePath, entry);

        const data = convert('<html>' + content + '</html>', {
          hebrew: text('bdbheb')
        });

        const hebrew = (data.hebrew && data.hebrew.length) ? data.hebrew[0] : strongsNum; //TODO: verify correct word being parsed
        
        const indexEntry = {
          id: strongsNum,
          name: hebrew
        };
        index.push(indexEntry);
        
        console.log(strongsNum + ", word = " + indexEntry.name + ", definition= " + entry.long);
      } else {
        console.warn("Strongs number not found: " + dictLine);
      }
    }
  }

  const filePath = path.join(versionPath, "index.json");
  fs.outputJsonSync(filePath, index);
  
    // const inputPath = path.join(__dirname, '../DictBDB.json');
  // const dictBDB = fs.readJsonSync(inputPath);
  // for (let i = 0, len = dictBDB.length; i < len; i++) {
  //   const item = dictBDB[i];
  //   const {top: strongs, def} = item;
  //   const data = convert('<html>' + def + '</html>', {
  //       hebrew: text('ref0.word > font'),
  //       strongs: text('div > p > b')
  //     }
  //   );
  //   console.log("data= " + data);
  // }
  console.log(`finished Parsing`);
}

