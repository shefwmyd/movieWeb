import { useEffect, useState } from "react";

const Header = () => {
  const [search, setSearch] = useState(null);

  useEffect(() => {
    const fetchSearch = async () => {
      try {
        const response = await fetch("/search", {
          method: "Get",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setSearch(data);
      } catch (error) {
        console.log("Error fetching movies:", error);
      }
    };

    fetchSearch();
  }, []);

  return (
    <header className="header-1">
      <h1 className="nav-h1">MOVIESWEB</h1>
      <nav className="navbar">
        <ul className="navbar-ul">
          <input
            type="search"
            placeholder="Search"
            onClick={(e) => setSearch(e.target.value)}
          />
          <li className="navbar-li">
            <a href="/Home">Home</a>
          </li>
          <li className="navbar-li">
            <a href="/About">About</a>
          </li>
          <li className="navbar-li">
            <a href="/Contact">Contact</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
