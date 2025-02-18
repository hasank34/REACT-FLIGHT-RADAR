import React, { useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import Error from "./../components/Error";
import ReactPaginate from "react-paginate";

const List = ({ setDetailId }) => {
  const { isLoading, error, flights } = useSelector((store) => store.flight);
  // kaçıncı elemandan itibaren kesileck
  const [start, setStart] = useState(0);
  // ekranda gösterlecek eleman sayısı
  const perPage = 10;
  // kaçıncı elemana kadar kesilecek
  const end = start + perPage;

  // slice methodu ile başlangıç ve bitiş
  const currFlights = flights.slice(start, end);

  // toplam sayfa sayısı
  const total = Math.ceil(flights.length / perPage);
  // yeni sayfaya tıklanınca
  const handlePageClick = (event) => {
    // başlangıç state'ini güncelle
    setStart(event.selected * perPage);
  };
  if (isLoading)
    return (
      <div className="list-loader">
        <Loader />
      </div>
    );
  if (error) return <Error msg={error} />;
  return (
    <div className="p-3 p-md-4">
      <table className="table table-dark table-striped table-hover table-responsive mt-5">
        <thead>
          <tr>
            <th>id</th>
            <th>Kuyruk Kodu</th>
            <th>Enlem</th>
            <th>Boylam</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {currFlights.map((flight) => (
            <tr>
              <td>{flight.id}</td>
              <td>{flight.code}</td>
              <td>{flight.lat}</td>
              <td>{flight.lng}</td>
              <td>
                <button
                  onClick={() => setDetailId(flight.id)}
                  className="button"
                >
                  Detay Gör
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ReactPaginate
        className="pagination"
        breakLabel="..."
        nextLabel="İleri >"
        previousLabel="< Geri"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={total}
        renderOnZeroPageCount={true}
      />
    </div>
  );
};

export default List;
