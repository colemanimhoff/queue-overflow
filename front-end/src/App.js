import React, {
  Component
} from "react";
import Navbar from "./components/Navbar";
// import ButtonGroup from "./components/ButtonGroup";
import ProblemForm from "./components/ProblemForm";
import "./App.css";
import {
  Redirect
} from "react-router-dom";

class App extends Component {
  state = {
    loggedIn: false
  };
  componentDidMount() {
    var access_token = window.Cookies.get("galvanize-secrets-token");
    if (access_token) {
      this.setState({
        loggedIn: true
      });
      this.setState({
        token: access_token
      });
    }
  }
  //   getUser = () => {
  //     fetch('https://api.github.com/user', {
  //       headers: { Authorization: 'Bearer ' + access_token }
  //     })
  //       .then(res => res.json())
  //       .then(data => {
  //         console.log(data);

  //   })
  // }
  updateForm = formInput => {
    this.setState({
      problem: formInput,
      fireRedirect: false
    });
  };

  updateComment = commentInput => {
    this.setState({
      comment: commentInput
    });
  };

  logOut = e => {
    window.Cookies.remove("galvanize-secrets-token");
    e.preventDefault();
    this.setState({
      token: undefined,
      loggedIn: false
    });
  };

  redirectToProblem = id => {
    return this.setState({
      routeId: id,
      fireRedirect: true
    });
  };
  getNextId = () => {
    fetch(`https://galvanize-queue-overflow.herokuapp.com/problems/`)
      .then(res => res.json())
      .then(problems => {
        return problems[problems.length - 1]["id"];
      })
      .then(id => {
        return this.setState({
          routeId: id
        });
      })
  };
  render() {
    return (<div className="App" >
      <Navbar token={
        this.state.token
      }
        loggedIn={
          this.state.loggedIn
        }
        logOutUser={
          this.logOut
        } />
      { /* <ButtonGroup /> */}
      <ProblemForm redirectToProblem={
        this.redirectToProblem
      }
        formState={
          this.state
        }
        updateForm={
          this.updateForm
        } />
      {/* <Footer /> */}
      {
        this.state.fireRedirect && (<
          Redirect to={
            `/problems/${this.state.routeId}`
          } />
        )
      }
    </div>
    );
  }
}

export default App;