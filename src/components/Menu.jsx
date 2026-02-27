import React from "react";
import { NavLink } from "react-router-dom";
import { MdHome, MdEvent, MdPersonAdd } from "react-icons/md";

export default function Menu() {
  return (
    <nav className="menu">
      <NavLink to="/" className={({ isActive }) => (isActive ? "link active" : "link")}>
        Home
        <MdHome size={20}> </MdHome>
      </NavLink>

      <NavLink to="/evento" className={({ isActive }) => (isActive ? "link active" : "link")}>
        Eventos
        <MdEvent size={20}> </MdEvent>
      </NavLink>

      <NavLink to="/cadastrar" className={({ isActive }) => (isActive ? "link active" : "link")}>
        Cadastrar
        <MdPersonAdd size={20}> </MdPersonAdd>
      </NavLink>

  
    </nav>
  );
}