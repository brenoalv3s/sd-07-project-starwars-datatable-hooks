import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import StarWarsContext from './StarWarsContext';
import planetApi from '../services/planetApi';

function Provider({ children }) {
  const [data, setPlanets] = useState([]);
  const [valueFilter, setValueFilter] = useState('');
  const [responseFilter, setRequestFilter] = useState([]);
  const [columns, setColumns] = useState(['population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [isFetching, setIsFetching] = useState(true);

  const [filters, setFilters] = useState({
    filterByName: { name: '' },
    filterByNumericValues: [
      { column: 'population', comparison: 'maior que', value: 0 },
    ],
  });

  const RequestAPI = async () => {
    setPlanets(await planetApi());
    setIsFetching(false);
  };

  const handleFilterName = (value) => {
    setFilters({
      ...filters,
      filterByName: {
        name: value,
      },
    });
    setValueFilter(value);
  };

  const handleFilterNumber = (name, value) => {
    setFilters({
      ...filters,
      filterByNumericValues: [
        { ...filters.filterByNumericValues[0],
          [name]: value,
        },
      ],
    });
  };

  const handleClickFilter = () => {
    setRequestFilter(data.filter((planet) => {
      const { column, comparison, value } = filters.filterByNumericValues[0];
      setColumns(columns.filter((sigleColumn) => sigleColumn !== column));
      if (planet[column] === 'unknow') return false;
      switch (comparison) {
      case 'maior que':
        return parseFloat(planet[column]) > parseFloat(value);
      case 'menor que':
        return parseFloat(planet[column]) < parseFloat(value);
      case 'igual a':
        return parseFloat(planet[column]) === parseFloat(value);
      default:
        return planet;
      }
    }));
  };

  useEffect(() => {
    RequestAPI();
  }, []);

  useEffect(() => {
    setRequestFilter(data.filter(({ name }) => name.toLowerCase().includes(valueFilter)));
  }, [valueFilter, data]);

  const context = {
    data,
    isFetching,
    responseFilter,
    valueFilter,
    columns,
    handleFilterName,
    handleFilterNumber,
    handleClickFilter,
  };

  return (
    <StarWarsContext.Provider value={ context }>
      {children}
    </StarWarsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};

export default Provider;
