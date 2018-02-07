import React, {Component} from 'react';
import Comment from './Comment';

class CommentList extends Component{
    constructor(props){
        super(props);
        this.onDeleteCommentBtn = this.onDeleteCommentBtn.bind(this);
    }
    
    renderComments(){
        var arr = this.props.comments;
        console.log (arr);
        return arr.map((comments, index)=>
        <Comment key={index} {...comments} indexComment={index} idComment={comments._id} onDeleteCommentBtn={this.onDeleteCommentBtn}/>
    );
    }

    onDeleteCommentBtn(commentIndex, commentId){
        this.props.onDeleteCommentBtn(commentIndex, commentId);
    }

    render(){
        return(
            <ul>
            {this.renderComments()}
            </ul>
        );
    };
};

export default CommentList;