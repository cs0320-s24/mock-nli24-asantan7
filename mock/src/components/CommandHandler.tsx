/**
 * A command-processor function for our REPL. The function returns a string, which is the value to print to history when
 * the command is done executing.
 *
 * The arguments passed in the input (which need not be named "args") should
 * *NOT* contain the command-name prefix.
 */

const fruitCSV = [
  ["Name", "ID", "Calories"],
  ["Apple", "1", "95"],
  ["Banana", "2", "105"],
  ["Peach", "3", "50"],
];

const drinksCSV = [
  ["Name", "ID", "Calories"],
  ["Water", "1", "95"],
  ["Coca Cola", "2", "105"],
  ["Juice", "3", "50"],
];

const mockedData = new Map<string, Array<Array<string>>>();
mockedData.set("fruitCSV", fruitCSV);
mockedData.set("drinksCSV", drinksCSV);

let globalData: string[][] = [];
let loaded: Boolean = false;

export interface REPLFunction {
  (args: Array<string>): string[][];
}
export const modeFunction: REPLFunction = (
  commandArray: Array<string>
): string[][] => {
  return [["Mode Switched!"]];
};

export const loadFunction: REPLFunction = (
  commandArray: Array<string>
): string[][] => {
  let data = mockedData.get(commandArray[0]);
  if (data != undefined) {
    globalData = data;
    loaded = true;
    return [["Success!"]];
  } else {
    loaded = false;
    return [["File Not Found!"]];
  }
};
export const viewFunction: REPLFunction = (
  commandArray: Array<string>
): string[][] => {
  if (loaded) {
    return globalData;
  } else {
    return [["Failure: View Without Load"]];
  }
};

export const searchFunction: REPLFunction = (
  //have to search w/column index or name
  commandArray: Array<string>
): string[][] => {
  let headers = commandArray[2];
  let value = commandArray[1];
  const results: string[][] = [];
  let headerIndex = 0;

  if (loaded) {
    if (commandArray.length === 3) {
      if (isNaN(parseInt(commandArray[0]))) { //column Name
        for (let i = 0; i < globalData[i].length; i++) {
          if (globalData[0][i] === commandArray[0]) {
            headerIndex = i;
          }
        }
      } else {
        headerIndex = parseInt(commandArray[0]);
      }
      if (headers === "Y") {
        for (let i = 1; i < globalData.length; i++) {
          if (globalData[i][headerIndex] === value) {
            results.push(globalData[0]);
            results.push(globalData[i]);
          }
        }
      }
      if (headers === "N") {
        for (let i = 0; i < globalData.length; i++) {
          if (globalData[i][parseInt(commandArray[0])] === value) {
            results.push(globalData[i]);
          }
        }
      }
      return results;
    } else {
      return [["Failure: Incorrect Number of Arguments"]];
    }
  } else {
    return [["Failure: Search Without Load"]];
  }
};
