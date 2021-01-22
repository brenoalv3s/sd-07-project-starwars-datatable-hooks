import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const FilterNumeric = () => {
  const {
    onClickFilterBtn,
    changeColumn,
    changeComparison,
    changeNumber,
    comparison,
    number,
    column,
    objectFinal,
  } = useContext(StarWarsContext);
  const arrayColumn = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];
  return (
    <div>
      <label htmlFor="columnFilter">
        <select
          data-testid="column-filter"
          id="columnFilter"
          name="columnFilter"
          onChange={ (e) => changeColumn(e) }
          value={ column }
        >
          {arrayColumn.filter((col) => col !== objectFinal.column)
            .map((option, index) => <option key={ index }>{ option }</option>)}
        </select>
      </label>
      <label htmlFor="comparison">
        <select
          data-testid="comparison-filter"
          id="comparison"
          name="comparison"
          onChange={ (e) => changeComparison(e) }
          value={ comparison }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="comparisonNumeric">
        <input
          type="number"
          data-testid="value-filter"
          name="comparisonNumeric"
          id="comparisonNumeric"
          onChange={ (e) => changeNumber(e) }
          value={ number }
        />
      </label>
      <button
        data-testid="button-filter"
        type="button"
        onClick={ () => onClickFilterBtn() }
      >
        Filtrar
      </button>
    </div>
  );
};

export default FilterNumeric;
