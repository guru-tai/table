import React, { useState } from "react";
import "./table.css";

function Table() {
  const [table, setTable] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editRow, setEditRow] = useState("");
  const [filter, setFilter] = useState(false);
  const [nameFilter, setNameFilter] = useState("");
  const [minScore, setMinScore] = useState("");
  const [maxScore, setMaxScore] = useState("");

  const handleAddClick = () => {
    setTable([
      ...table,
      { id: table.length, name: "", age: "", score: "", job: "" },
    ]);
  };
  const removing = (id) => {
    const updatedTable = table.filter((row) => row.id !== id);
    setTable(updatedTable);
  };

  const inputChange = (id, field, value) => {
    const updatedTable = table.map((row) =>
      row.id === id ? { ...row, [field]: value } : row
    );
    setTable(updatedTable);
  };

  const save = () => {
    setEdit(false);
    setEditRow("");
  };
  const filters = table.filter(
    (row) =>
      row.name.toLowerCase().includes(nameFilter.toLowerCase()) &&
      (minScore === "" || parseFloat(row.score) >= parseFloat(minScore)) &&
      (maxScore === "" || parseFloat(row.score) <= parseFloat(maxScore))
  );

  return (
    <div className="container">
      <header className="heading">
        <h2>Table</h2>
        <div>
          <button className="button-filter" onClick={() => setFilter(!filter)}>
            Filters
          </button>
        </div>
      </header>
      {filter && (
        <div>
          <label>
            Name Filter:
            <input
              type="text"
              placeholder="Enter name"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            />
          </label>
          <label>
            minimum score:
            <input
              type="number"
              value={minScore}
              onChange={(e) => setMinScore(e.target.value)}
            />
          </label>
          <label>
            maximum Score:
            <input
              type="number"
              value={maxScore}
              onChange={(e) => setMaxScore(e.target.value)}
            />
          </label>
        </div>
      )}
      <main>
        <table border={1}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>score</th>
              <th>job</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filters.map((row) =>
              edit && editRow === row.id ? (
                <tr key={row.id}>
                  <td className="inputfields">
                    <input
                      type="text"
                      value={row.name}
                      onChange={(e) =>
                        inputChange(row.id, "name", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.age}
                      onChange={(e) =>
                        inputChange(row.id, "age", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={row.score}
                      onChange={(e) =>
                        inputChange(row.id, "score", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={row.job}
                      onChange={(e) =>
                        inputChange(row.id, "job", e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <div>
                      <button className="button-save" onClick={save}>
                        Save
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                <tr key={row.id}>
                  <td
                    onClick={(e) => {
                      setEdit(true);
                      setEditRow(row.id);
                    }}
                  >
                    {row.name}
                  </td>
                  <td
                    onClick={(e) => {
                      setEdit(true);
                      setEditRow(row.id);
                    }}
                  >
                    {row.age}
                  </td>
                  <td
                    onClick={(e) => {
                      setEdit(true);
                      setEditRow(row.id);
                    }}
                  >
                    {row.score}
                  </td>
                  <td
                    onClick={(e) => {
                      setEdit(true);
                      setEditRow(row.id);
                    }}
                  >
                    {row.job}
                  </td>
                  <td>
                    <div>
                      <button
                        className="button"
                        onClick={() => {
                          setEdit(true);
                          setEditRow(row.id);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="button"
                        onClick={() => removing(row.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </main>
      <div className="add">
        <button className="button-add" onClick={handleAddClick}>
          Add
        </button>
      </div>
    </div>
  );
}
export default Table;
