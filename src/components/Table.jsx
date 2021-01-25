import React from 'react';
import MyContext from '../context/MyContext';

class Table extends React.Component {
  constructor() {
    super();

    this.getCells = this.getCells.bind(this);
    this.getRows = this.getRows.bind(this);
    this.getHeaders = this.getHeaders.bind(this);
  }

  getCells(cells) {
    const listOfCells = [];
    cells.forEach((cell, index) => {
      listOfCells.push(
        <th key={ `cell-${index}` }>
          {cell}
        </th>,
      );
    });
    return listOfCells;
  }

  getRows(value) {
    const planets = Object
      .entries(value)
      .map((each) => each[1]);
    const headers = [];

    planets.forEach((planet, index) => {
      headers.push(
        <tr key={ `row-${index}` }>
          {this.getCells(Object.values(planet))}
        </tr>,
      );
    });
    return headers;
  }

  getHeaders(value) {
    const listOfHeaders = [];
    // referência: https://stackoverflow.com/questions/65640323/reactjs-cannot-convert-undefined-or-null-to-object-w-formik
    if (value !== null && value !== undefined
      && typeof Object.keys(value) !== 'undefined'
      && Object.keys(value).length >= 1
    ) {
      Object.keys(value).forEach((header, index) => listOfHeaders.push(
        <th key={ `header-${index}` }>{header}</th>,
      ));
    }
    return listOfHeaders;
  }

  render() {
    return (
      <MyContext.Consumer>
        {(value) => (
          <table className="table">
            <thead>
              <tr>
                {this.getHeaders(value[0])}
              </tr>
            </thead>
            <tbody>
              {this.getRows(value)}
            </tbody>
          </table>
        )}
      </MyContext.Consumer>
    );
  }
}

export default Table;
