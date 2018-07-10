import React from "react";
import { Container, Header, Label } from "semantic-ui-react";
import { NavLink } from "react-router-dom";

class Problem extends React.Component {
  logData() {
    let k = 0;
    return this.props.tags[this.props.problemData.id].map(tag => {
      return (
        <Label key={k++} as="a">
          {tag}
        </Label>
      );
    });
  }
  replaceText = str => {
    return str.replace(/`{3}([\s\S]*?)`{3}/gm, "<pre><code>$1</code></pre>");
  };
  parseTextToObject = str => {
    let arr = [];
    let chunks = str.split("<pre><code>");
    chunks.map(chunk => {
      if (chunk.includes("</code></pre>")) {
        let temp = chunk.split("</code></pre>");
        arr.push({ type: "code", value: temp[0].trim() });
        if (temp[1]) arr.push({ type: "plainText", value: temp[1].trim() });
      } else {
        arr.push({ type: "plainText", value: chunk.trim() });
      }
      return chunk;
    });
    return arr;
  };
  renderProblemText = () => {
    let str = this.replaceText(this.props.problemData.problem_text);
    let arr = this.parseTextToObject(str);
    let k = 0;
    return arr.map(textSection => {
      if (textSection.type === "code")
        return (
          <div key={k++}>
            <pre>
              <code>{textSection.value}</code>
            </pre>
          </div>
        );
      else return <div key={k++}>{textSection.value}</div>;
    });
  };
  render() {
    return (
      <Container className="col-10 problem-container">
        <Header
          as={NavLink}
          to={`/problems/${this.props.problemData.id}`}
          id="problem-title"
        >
          {this.props.problemData
            ? this.props.problemData.problem_title
            : "broken"}

        </Header>
        <hr />
        <div id="problem-text">
          {this.props.problemData &&
            this.props.problemData.problem_text
            ? this.renderProblemText(this.props.problemData.problem_text)
            : "??"}

        </div>
        <Label.Group color="orange">
          {this.props.tags &&
            this.props.tags[this.props.problemData.id]
            ? this.logData()
            : ""}

        </Label.Group>

      </Container>
    );
  }
}

export default Problem;