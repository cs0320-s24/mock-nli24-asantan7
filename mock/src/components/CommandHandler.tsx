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

const mockedData = new Map<String, Array<Array<String>>>();
mockedData.set("fruitCSV", fruitCSV);
let data: string[][] = [];
let loaded: Boolean = false;

export interface REPLFunction {
  (args: Array<string>): String | String[][];
}
// export const modeFunction: REPLFunction = (
//   commandArray: Array<string>
// ): string | string[][] => {
//   return "jim";
// };

export const loadFunction: REPLFunction = (
  commandArray: Array<string>
): string | string[][] => {
  if (mockedData.has(commandArray[0])) {
    let data = mockedData.get(commandArray[0]);
    let loaded = true;
    return "Success!"
  } else {
    let loaded = false;
    return "File Not Found!"
  }
};
export const viewFunction: REPLFunction = (
  commandArray: Array<string>
): string | string[][] => {
  if (loaded) {
    return data;
  } else {
    return "Failure: View Without Load"
  }
};

