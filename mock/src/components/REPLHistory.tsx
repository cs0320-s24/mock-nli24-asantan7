import React from "react";
import "../styles/main.css";

interface REPLHistoryProps {
  history: JSX.Element[];
  mode: boolean;
}

export function REPLHistory(props: REPLHistoryProps) {
    

  return (
    <div className="repl-history" aria-label="repl-history">
      {props.history.map((command) => (
        command
      ))}
    </div>
  );
}

{/* <div className="repl-history" aria-label="repl-history">
      {props.history.map((command) => (
        <p>Command: {command}</p>
      )
    )}
      {props.output.map((data, index) => (
        <React.Fragment key={`output_${index}`}>
          {typeof data === "string" ? (
            <p>{data}</p>
          ) : (
            <table>
              <tbody>
                {data.map((row, rowIndex) => (
                  <tr key={`row_${rowIndex}`}>
                    {row.map((cell, cellIndex) => (
                      <td key={`cell_${cellIndex}`}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </React.Fragment>
      ))}
    </div> */}
