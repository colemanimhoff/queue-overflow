import React from "react";
import Problem from "./Problem";
import NavBar from "./Navbar"
import { Header } from 'semantic-ui-react';
import Fuzzy from 'fuzzy';

const apiUrl = "https://galvanize-queue-overflow.herokuapp.com/";

class ProblemList extends React.Component {
  state = {
    problems: [],
    tags: []
  }
  componentDidMount() {
    fetch(apiUrl + 'problems')
      .then(response => response.json())
      .then(problems => {
        return this.setState({ problems: problems });
      }).then(() => {
        let uniqueProblems = {};
        fetch(`https://galvanize-queue-overflow.herokuapp.com/problem/tags`)
          .then(res => res.json())
          .then(problemTags => {
            for (let problem of problemTags) {
              if (uniqueProblems[problem.problem_id.toString()]) {
                uniqueProblems[problem.problem_id.toString()].push(
                  problem.tag_name
                );
              } else {
                uniqueProblems[problem.problem_id.toString()] = [];
                uniqueProblems[problem.problem_id.toString()].push(
                  problem.tag_name
                );
              }
            }
            this.setState({ tagsArrays: uniqueProblems });
            if(this.props.location.state) {
              this.filterProblems()
            }
          });
      })
  }
  filterProblems = () => {
    let results = Fuzzy.filter(this.props.location.state.searchTerm[0], this.state.problems, { extract: obj => obj.problem_text })
    var matches = results.map(function(el) { return el.string; });
    let finalMatch = this.state.problems.filter(e => {
      return matches.includes(e.problem_text)
    })
    this.setState({problems: finalMatch})
  }
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Header as="h1" id="issue-title">Open Issues</Header>
        <div>
          {
            this.state.problems
              ?
              this.state.problems.map((problem, i) => {
                return <Problem key={i} tags={this.state.tagsArrays} problemData={problem} />
              })
              :
              ''
          }
        </div>
      </React.Fragment >
    )
  }
}

export default ProblemList