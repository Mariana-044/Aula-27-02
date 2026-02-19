import React from "react";
import { NavLink } from "react-router-dom";

export default function Menu() {
  return (
    <nav className="menu">
      <ul>
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "link active" : "link")}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/evento" className={({ isActive }) => (isActive ? "link active" : "link")}>
            Eventos
          </NavLink>
        </li>
        <li>
          <NavLink to="/cadastrar" className={({ isActive }) => (isActive ? "link active" : "link")}>
            Cadastrar
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}
