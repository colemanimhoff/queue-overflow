import React from "react";

class Comment extends React.Component {
  render() {
    return (
      <div>
        {
          this.props.commentData ?
            <div className='col-6 comment-container'>{this.props.commentData.comment_text}</div>
            :
            ''
        }
      </div>
    )
  }
}

export default Comment;
