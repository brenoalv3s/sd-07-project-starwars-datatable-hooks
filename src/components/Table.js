import React, { useContext, useState, useEffect } from 'react';
import { StarWarsContext } from '../context/StarWarsContext';

function Table() {
  const { filters } = useContext(StarWarsContext);
  const [data, setData] = useState([]);
  const EMPTY = 0;

  useEffect(() => {
    async function fetchPlanets() {
      const response = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const json = await response.json();
      setData(json.results);
    }
    fetchPlanets();
  }, []);

  if (data.length === EMPTY) {
    return (
      <p>Loading...</p>
    );
  }
  const header = Object.keys(data[EMPTY]);
  const filteredHeader = header.filter((key) => key !== 'residents');
  const { filterByNumericValues, filterByName } = filters;
  return (
    <div>
      <table
        className="table
        table-dark
        table-striped
        table-hover
        table-responsive"
      >
        <thead>
          <tr>
            {filteredHeader.map((item) => <th key={ item }>{item}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.filter((item) => item.name.includes(filterByName.name)).map((planet) => {
            let controlVar = EMPTY;
            filterByNumericValues.forEach((filter) => {
              const { column, comparison, value } = filter;
  // conditionals adapted from vitor-rc1
              if (
                comparison === 'maior que'
                && Number(planet[column]) > Number(value)
                && !(planet[column] === 'unknown')
              ) {
                controlVar += 1;
              } else if (
                comparison === 'menor que'
                && Number(planet[column]) < Number(value)
                && !(planet[column] === 'unknown')
              ) {
                controlVar += 1;
              } else if (
                comparison === 'igual a' && Number(planet[column]) === Number(value)
                && !(planet[column] === 'unknown')
              ) {
                controlVar += 1;
              }
            });
            if (
              !(controlVar === filterByNumericValues.length)
            ) return null;
            return (
              <tr key={ planet.name }>
                {filteredHeader.map((key, index) => (
                  <td key={ `key-${index}` }>{planet[key]}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
