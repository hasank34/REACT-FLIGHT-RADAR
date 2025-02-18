import React from "react";
import { NavLink } from "react-router-dom";

const Button = () => {
  return (
    <div className="buttons">
      <NavLink to={"/"}>
        <button>Harita Görünümü</button>
      </NavLink>
      <NavLink to={"/list"}>
        <button>Liste Görünümü</button>
      </NavLink>
    </div>
  );
};

export default Button;
