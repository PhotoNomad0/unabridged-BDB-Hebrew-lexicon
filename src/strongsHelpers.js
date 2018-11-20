/**
 * ugntHelpers.js - this is the code called by ugntParse.js to download and convert greek resources (was BHP and now
 *                  UGNT.
 */

import path from 'path-extra';

const outputPath = path.join('resources', 'grc', 'bibles', 'ugnt');


/**
 * @description - generates UGNT for each book from github and split into chapters and saves under version.
 * @param {function} resolve - callback when finished
 */
export function generateStrongsFiles(resolve) {
  console.log(`Parsing Strongs`);
  resolve();
}

