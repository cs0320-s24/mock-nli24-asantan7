import { Dispatch, SetStateAction, useState } from "react";
import "../styles/main.css";
import { ControlledInput } from "./ControlledInput";
import { REPLFunction, viewFunction, loadFunction } from "./CommandHandler";

import React from "react";

interface REPLInputProps {
  history: string[];
  setHistory: Dispatch<SetStateAction<string[]>>;
  output: (string | string[][])[];
  setOutput: Dispatch<SetStateAction<(string | string[][])[]>>;
}
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props: REPLInputProps) {
  // Remember: let React manage state in your webapp.
  // Manages the contents of the input box
  const [commandString, setCommandString] = useState<string>("");
  const [count, setCount] = useState<number>(0);

  const functionMap = new Map<String, REPLFunction>();
  functionMap.set("load_csv", loadFunction);
  functionMap.set("view", viewFunction);

  // This function is triggered when the button is clicked.
  function handleSubmit(commandString: string) {
    setCount(count + 1);
    let commandArray = commandString.split(" ");
    const command = commandArray[0];
    const commandFunction = functionMap.get(command);
    if (commandFunction!=undefined) {
      commandArray.shift();
      const result = commandFunction(commandArray);
      props.setHistory([...props.history, command]);
      props.setOutput([...props.output, result]);
    } else {
      props.setHistory([...props.history, "Command Not Found!"]);
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
