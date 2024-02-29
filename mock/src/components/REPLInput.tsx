import { Dispatch, SetStateAction, useState } from "react";
import "../styles/main.css";
import { ControlledInput } from "./ControlledInput";
import { REPLFunction, viewFunction, loadFunction, modeFunction, searchFunction } from "./CommandHandler";

import React from "react";

interface REPLInputProps {
  history: JSX.Element[];
  setHistory: Dispatch<SetStateAction<JSX.Element[]>>;
  mode: boolean;
  setMode: Dispatch<SetStateAction<boolean>>;
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  const [commandString, setCommandString] = useState<string>("");
  const [count, setCount] = useState<number>(0);

  const functionMap = new Map<String, REPLFunction>();
  functionMap.set("mode", modeFunction);
  functionMap.set("load_csv", loadFunction);
  functionMap.set("view", viewFunction);
  functionMap.set("search", searchFunction);

  // This function is triggered when the button is clicked.
  function handleSubmit(commandString: string) {
    setCount(count + 1);
    let commandArray = commandString.split("+");
    let command = commandArray[0];
    const commandFunction = functionMap.get(command);
    if (commandFunction!=undefined) {
      commandArray.shift();
      const result = commandFunction(commandArray);
      if (result[0][0] === "Mode Switched!") {
        props.setMode(!props.mode);
      }
      const element = convertArraytoTable(result,command,props.mode);
      props.setHistory([...props.history, element]);
    } else {
      const element = convertArraytoTable([["Command Not Found"]], command, props.mode);
      props.setHistory([...props.history, element]);
    }
    setCommandString("");
  }
  /**
   * We suggest breaking down this component into smaller components, think about the individual pieces
   * of the REPL and how they connect to each other...
   */
  return (
    <div className="repl-input">
      {/* This is a comment within the JSX. Notice that it's a TypeScript comment wrapped in
            braces, so that React knows it should be interpreted as TypeScript */}
      {/* I opted to use this HTML tag; you don't need to. It structures multiple input fields
            into a single unit, which makes it easier for screenreaders to navigate. */}
      <fieldset>
        <legend>Enter a command:</legend>
        <ControlledInput
          value={commandString}
          setValue={setCommandString}
          ariaLabel={"Command input"}
        />
      </fieldset>
      {/* TODO: Currently this button just counts up, can we make it push the contents of the input box to the history?*/}
      <button onClick={() => handleSubmit(commandString)}>
        Submitted {count} times
      </button>
    </div>
  );
}

function convertArraytoTable(data: Array<Array<string>>, commandName: string, mode: boolean) {
  if (mode) {
    return (
      <div>
        <p>Command: {commandName} </p>
        <table>
          <caption> Output: </caption>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={`row_${rowIndex}`}>
                {row.map((cell, cellIndex) => (
                  <td key={`cell_${rowIndex}_${cellIndex}`}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  } else {
    return (
      <table>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={`row_${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td key={`cell_${rowIndex}_${cellIndex}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
   
  };
}
