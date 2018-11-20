/**
 * strongsParse.js - this is a script to parse strongs json and generate the json files
 *    used by tC.
 *
 *    To run script:
 *    * Run `npm i` in project folder to install node_modules
 *    * Run `npm run strongs-parse` to generate strongs json files
 *    * json output will be in ./resources/
 */

import { generateStrongsFiles} from '../src/strongsHelpers';

function main() {
  // let version = getParameter('ver');
  // if(!version) {
  //   console.log('process.argv', process.argv);
  //   console.log("Invalid parameter, expect version such as: '--ver=v0.2'");
  //   return;
  // }

  return new Promise((resolve) => {
    generateStrongsFiles(resolve);
  }).then(() => {
    console.log('strongs processing completed!');
  }).catch((e) => {
    console.log('Failed: ' + e);
  });
}

function getParameter(param, dflt=null) {
  const find = '--' + param + '=';
  let value = dflt;
  for(let i=2; i<process.argv.length; i++) {
    let itemN = process.argv[i].split(find);
    if (itemN.length < 2) {
      continue;
    }
    value = itemN[1];
    break;
  }
  return value;
}

main();
