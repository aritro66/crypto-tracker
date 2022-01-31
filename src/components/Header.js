import React from 'react';
import logo from "../images/crypto-icon.png";
import "./Header.css";

export default function Header() {
  return <header id="heading">
  <img src={logo} alt="logo"/>
  <p>Crypto Tracker</p>
</header>;
}
