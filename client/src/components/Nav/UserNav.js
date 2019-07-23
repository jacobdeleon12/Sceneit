function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
      <a className="navbar-brand" href="/">
        {Logo}
      </a>
      <button className="navbar-toggler" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end text-center" id="navbarNav">
        <ul className="navbar-nav mr-3">
          <li className="nav-item">
            <a className="nav-link" href="/main">Home</a>
          </li>
          <li className="nav-item mr-1">
            <a className="nav-link" href="/main/user">Edit Profile</a>
          </li>
          <li className="nav-item">
            <GLogout />
          </li>
        </ul>
        <form className="form-inline my-2 my-lg-0" style={{display: "block"}}>
          <input className="form-control mr-sm-2" type="search" placeholder="Search Videos" aria-label="Search" />
          <button className="btn btn-outline-success my-2 my-sm-0 vidSearch" type="submit">Search</button>
        </form>
      </div>
    </nav>
  );
}

export default NavBar;
