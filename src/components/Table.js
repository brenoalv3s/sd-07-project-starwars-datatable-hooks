import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const Table = () => {
  const { data, filters } = useContext(StarWarsContext);
  let newData = [];
  if (filters) newData = filters.filterByName.name;
  if (!filters) newData = data;
  const magicNumber = 0;
  return (
    <table>
      <thead>
        <tr>
          {
            data
              ? Object.keys(data[0]).filter((key) => key !== 'residents')
                .map((tableHeader) => (
                  <th key={ tableHeader }>
                    {tableHeader.replace('_', ' ')
                      .replace(tableHeader
                        .charAt(magicNumber), tableHeader
                        .charAt(magicNumber).toUpperCase())}
                  </th>))
              : <p>Carregando.</p>
          }
        </tr>
      </thead>
      <tbody>
        {newData && newData.map((planeta, index) => (
          <tr key={ index }>
            {Object.entries(planeta).map(([key, value]) => {
              if (key === 'residents') {
                return undefined;
              }
              return (
                <td key={ key }>{value}</td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
