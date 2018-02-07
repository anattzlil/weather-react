import React, {Component} from 'react';

class Comment extends Component{
    constructor(props){
        super(props);
        this.state=({indexComment: this.props.indexComment})
        this.onDeleteCommentBtn = this.onDeleteCommentBtn.bind(this);
    }

    onDeleteCommentBtn(){
        let commentId = this.props.idComment
        let commentIndex = this.state.indexComment
        this.props.onDeleteCommentBtn(commentIndex, commentId);
    };

    render(){
        return(
            <li>
                Written by: {this.props.name}:{ this.props.text}
                <button type="button" onClick={this.onDeleteCommentBtn}><i className="fa fa-trash"></i></button>
            </li>
        );
    };
};

export default Comment;