import React, { useState, useEffect } from "react";
import DataTables from "react-data-table-component";
import axios from "axios";

const MoviesList = () => {
  const [search, setSearch] = useState("");
  const [showMovies, setshowMovies] = useState([]);

  const getMovies = async () => {
    try {
      const getMoviesData = await axios.get("https://restcountries.com/v2/all");
      setshowMovies(getMoviesData.data);
    } catch (error) {
      console.log("error");
    }
    // const getMoviesData = await fetch("https://restcountries.com/v2/all");
    // const getMovieDetails = await getMoviesData.json();
    // setshowMovies(getMovieDetails.data);
  };

  useEffect(() => {
    getMovies();
  }, []);

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
      data={showMovies}
      pagination
      selectableRows
      selectableRowsHighlight
      highlightOnHover
      actions={<button>Export</button>}
      subHeader
      subHeaderComponent={<input type="text" placeholder="Search here" />}
    />
  );
};

export default MoviesList;
