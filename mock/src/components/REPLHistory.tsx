import React from "react";
import "../styles/main.css";

interface REPLHistoryProps {
  // TODO: Fill with some shared state tracking all the pushed commands
  // CHANGED

  history: (string | string[][])[];
  mode: boolean;
}
const TableDisplay = ({ data }) => {
  return (
    <div>
      <h2>Table Display</h2>
      <table>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export function REPLHistory(props: REPLHistoryProps) {
  return (
    <div className="repl-history" aria-label="repl-history">
      {props.history.map((command) => (
        <p>{command}</p>
      ))}
    </div>
  );
}
