import React, {Component} from 'react';

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state=({name:"", text:""});
        this.handleComment = this.handleComment.bind(this);
        this.handleVisitor = this.handleVisitor.bind(this);
        this.handleSubmitComment = this.handleSubmitComment.bind(this);
    }

    handleVisitor(e){
        this.setState({name: e.target.value});
        console.log(this.state);
    }

    handleComment(e){
        this.setState({text: e.target.value});
        console.log(this.state);

    }

    handleSubmitComment(e){
        e.preventDefault();
        this.props.onSubmitComment(this.state);
        this.setState({name:"", text:""});
    }

    render(){
        return(
            <div>
                <form>
                    <input type="text" placeholder="visitor" value = {this.state.name} onChange={this.handleVisitor}/>
                    <input type="text" placeholder="Enter comment" value = {this.state.text} onChange={this.handleComment}/>
                    <button type="submit" className="comment-btn btn" onClick={this.handleSubmitComment}>Submit</button>
                </form>
            </div>
        );
    };
};

export default CommentForm;