import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const { flights, isLoading, error } = useSelector((store) => store.flight);

  return (
    <header>
      <Link to={"/"}>
        <img src="/plane-logo.png" alt="plane-logo" />
        <h2>Uçuş Radarı</h2>
      </Link>

      <h3>
        {isLoading
          ? "Uçuşlar Aranıyor..."
          : error
          ? "Hata" + error
          : `${flights.length} Uçuş Bulundu`}
      </h3>
    </header>
  );
};

export default Header;
