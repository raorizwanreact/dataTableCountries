import React, { useState, useEffect } from "react";
import DataTables from "react-data-table-component";
import axios from "axios";

const Countries = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);

  const getCountries = async () => {
    try {
      const getCountriesData = await axios.get(
        "https://restcountries.com/v2/all"
      );
      setCountries(getCountriesData.data);
      setFilteredCountries(getCountriesData.data);
    } catch (error) {
      console.log("error");
    }
    // const getCountriesData = await fetch("https://restcountries.com/v2/all");
    // const getMovieDetails = await getCountriesData.json();
    // setCountries(getMovieDetails.data);
  };

  useEffect(() => {
    getCountries();
  }, []);

  useEffect(() => {
    const result = countries.filter((country) => {
      return country.name.toLowerCase().match(search.toLowerCase());
    });
    setFilteredCountries(result);
  }, [search]);

  const column = [
    { name: "Country Name", selector: (row) => row.name, sortable: true },
    { name: "Capital", selector: (row) => row.capital, sortable: true },
    { name: "Region", selector: (row) => row.region, sortable: true },
    { name: "Population", selector: (row) => row.population, sortable: true },
    {
      name: "Image",
      selector: (row) => <img src={row.flag} width={25} height={25} />,
    },
    {
      name: "Edit",
      cell: (row) => (
        <button
          className="btn btn-success"
          onClick={() => {
            alert(row.name);
          }}
        >
          Edit
        </button>
      ),
    },
    {
      name: "Delete",
      cell: (row) => <button className="btn btn-warning">Delete</button>,
    },
  ];

  return (
    <DataTables
      title="Countires List"
      columns={column}
      data={filteredCountries}
      pagination
      selectableRows
      selectableRowsHighlight
      highlightOnHover
      actions={<button>Export</button>}
      subHeader
      subHeaderComponent={
        <input
          type="text"
          placeholder="Search here"
          className="w-25 form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      }
    />
  );
};

export default Countries;
