import React, { Component } from "react";
import { Segment, Menu, Input } from "semantic-ui-react";
import { NavLink, Redirect } from "react-router-dom";
import GLogo from "../assets/g-logo-small.png"
import GithubLogo from "../assets/github-logo.png"

class Navbar extends Component {
  state = {
    activeItem: "home",
    searchTerm: '',
    redirect: false
  };
  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  }
  handleChange = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: [event.target.value] })
  }
  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.setState({ redirect: true });
    }

  }
  render() {
    const { activeItem } = this.state;
    if (this.state.redirect) {
      return (<Redirect to={{
        pathname: '/queries/' + encodeURIComponent(this.state.searchTerm),
        state: { searchTerm: this.state.searchTerm }
      }} />)
    }
    return (
      <Segment className="col-12 navbar" inverted id="navbar-container">
        <Menu attached inverted pointing secondary>
          <img src={GLogo} alt="Galvanize Logo" className="galv-logo" />
          <Menu.Item
            as={NavLink}
            to="/"
            name="home"
            className="nav-links"
            active={activeItem === "home"}
            onClick={this.handleItemClick} />
          <Menu.Item
            as={NavLink}
            to="/problems"
            name="questions"
            className="nav-links"
            active={activeItem === "questions"}
            onClick={this.handleItemClick} />
            <Menu.Item
            as={NavLink}
            to="/about"
            name="about"
            className="nav-links"
            active={activeItem === "about"}
            onClick={this.handleItemClick} />
          <Menu.Item position="right">
            <Input
              onChange={this.handleChange}
              onKeyPress={this.handleKeyPress}
              name="searchTerm"
              className="icon"
              value={this.state.searchTerm}
              icon="search"
              placeholder="Search..."
              id="searchbar" />
          </Menu.Item>
          {/* <Menu.Item
            name="ask"
            active={activeItem === "ask"}
            onClick={this.handleItemClick}/>
          <Menu.Item
            name="users"
            active={activeItem === "users"}
            onClick={this.handleItemClick}/> */}
          {
            this.props.token ?
              (
                <Menu.Item
                  name="Log Out"
                  active={activeItem === "users"}
                  onClick={this.props.logOutUser}
                  position="right" />
              )
              :
              (
                <Menu.Item
                  href="https://github.com/login/oauth/authorize?client_id=e75e8c72d121f49f6a1b"
                  name="Sign In"
                  active={activeItem === "users"}
                  onClick={this.handleItemClick}
                  position="right" />
              )
          }
          <img src={GithubLogo} alt="github logo" />
        </Menu>
      </Segment>
    )
  }
}

export default Navbar