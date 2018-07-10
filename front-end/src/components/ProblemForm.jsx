import React, { Component } from "react";
import {
  Button,
  Input,
  TextArea,
  Form,
  Dropdown,
  Header
} from "semantic-ui-react";
const apiUrl = "https://galvanize-queue-overflow.herokuapp.com/";
class ProblemForm extends Component {
  state = {
    title: "",
    body: "",
    selectedTags: []
  };

  componentDidMount() {
    fetch(apiUrl + "tags")
      .then(response => response.json())
      .then(data => this.setState({ tags: data }));
  }

  resetForm = () => {
    this.setState({ title: "", body: "", showResponse: false });
  };

  handleFormChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  postProblemText = event => {
    event.preventDefault();
    this
      .props
      .updateForm(this.state);
    this.setState({ showResponse: true });
    const randomUser = Math.floor(Math.random() * 5) + 1;
    const currentDate = new Date().toJSON();
    const body = {
      users_id: randomUser,
      date: currentDate,
      problem_title: this.state.title,
      problem_text: this.state.body,
      problem_solved: false
    };
    return fetch(apiUrl + "problems", {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify(body)
    })
      .then(response => response.json())
      .then(response => {
        return response.id;
      });
  };
  postProblem = event => {
    return this
      .postProblemText(event)
      .then(id => {
        Promise
          .all(this.postTags(id))
          .then(() => {
            this
              .props
              .redirectToProblem(id);
          })
          .catch(() => {
            console.error('some tags were not saved');
            this
              .props
              .redirectToProblem(id);
          })
      })
  };
  postTags = id => {
    this
      .state
      .selectedTags
      .forEach(selectedTag => {
        let filteredTag = this
          .state
          .tags
          .filter(tag => {
            return tag.tag_name === selectedTag;
          });
        return filteredTag.map(tag => {
          let body = {
            problem_id: id,
            tag_id: tag.id
          };
          return fetch(apiUrl + "problem/tags", {
            method: "POST",
            headers: new Headers({ "content-type": "application/json" }),
            body: JSON.stringify(body)
          })
            .then(response => response.json())
            .then(data => data)
            .then(data => {
              return data.error
                ? this.setState({ error: true })
                : this.setState({ error: false });
            });
        });
      });
  };

  addTags = event => {
    if (event.target.innerText === "") {
      let stateCopy = [...this.state.selectedTags];
      let elementText = event.target.parentNode.innerText;
      let tag = stateCopy.indexOf(elementText);
      stateCopy.splice(tag, 1);
      this.setState({ selectedTags: stateCopy });
    } else {
      this.setState({
        selectedTags: this
          .state
          .selectedTags
          .concat(event.target.innerText)
      });
    }
  };

  render() {
    return (
      <Form className="col-8-front" id="form-container">
        <Header as="h1">Ask a Question</Header>
        <p id='problem-instructions'>Be as specific as possible. Give a concise title
          and add relative tags. <br /> Post any relevant code wrapped in ``` (three backticks) ```</p>
        <Form.Field>
          <label className="problem-labels">Title</label>
          <Input
            name="title"
            placeholder="Title"
            id="title-bar"
            value={this.state.title}
            onChange={this.handleFormChange} />
        </Form.Field>
        <Form.Field onChange={this.handleFormChange}>
          <TextArea
            name="body"
            placeholder="Describe your programming problem in detail"
            style={{
              minHeight: 150
            }}
            value={this.state.body} />
        </Form.Field>
        <Form.Field>
          <label className="problem-labels">Tags</label>
          <Dropdown
            placeholder="Tags"
            fluid
            multiple
            search
            selection
            onChange={this.addTags}
            options={this.state.tags
              ? this
                .state
                .tags
                .map((tag, i) => {
                  return { key: i, value: tag.tag_name, text: tag.tag_name };
                })
              : ""} />
        </Form.Field>
        <Button
          // eslint-disable-next-line
          color="orange problem-labels"
          type="submit"
          onClick={this.postProblem}
          id='problem-submit-button'>
          {" "}
          Submit Your Question
        </Button>
      </Form>
    );
  }
}

export default ProblemForm;
