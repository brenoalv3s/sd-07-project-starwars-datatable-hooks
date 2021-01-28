import React from 'react';
import PropTypes from 'prop-types';
import fetchApi from '../services/fetchApi';
import StarWarsContext from './StarWarsContext';

function Provider({ children }) {
  const [data, setData] = React.useState();
  const [filters, setFilters] = React.useState({ filterByName: { name: '' } });
  const [column, setColumn] = React.useState('population');
  const [comparison, setComparison] = React.useState('maior que');
  const [value, setValue] = React.useState();

  const getFetch = async () => {
    setData(await fetchApi());
  };

  React.useEffect(() => {
    getFetch();
  }, []);

  const allFilters = () => {
    setData([]);
    if (comparison === 'maior que') {
      setData(
        data.filter((item) => Number(item[column]) > value),
      );
    } else if (comparison === 'menor que') {
      setData(
        data.filter((item) => Number(item[column]) < value),
      );
    } else {
      setData(
        data.filter((item) => Number(item[column]) === Number(value)),
      );
    }
  };

  const state = {
    data,
    filters,
    setFilters,
    allFilters,
    setColumn,
    setComparison,
    setValue,
  };

  return (
    <StarWarsContext.Provider value={ state }>
      { children }
    </StarWarsContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
