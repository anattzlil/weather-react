import React, {Component} from 'react';
import CommentForm from './CommentForm.js';
import CommentList from './CommentList.js';
import axios from 'axios';

class WeatherBox extends Component{
    constructor(props){
        super(props);
        this.onSubmitComment = this.onSubmitComment.bind(this);
        this.onDeleteBtn = this.onDeleteBtn.bind(this);
        this.onDeleteCommentBtn = this.onDeleteCommentBtn.bind(this);
    }


    onSubmitComment(data){
        let id = this.props.dataIndex;
        let index= this.props.index;
        this.props.onSubmitComment(data, id, index);
        console.log(data, id, index);
    }


    onDeleteBtn(){
        let id = this.props.dataIndex;
        let index= this.props.index;
        this.props.onClickDelete(id, index);
    }
    onDeleteCommentBtn(commentIndex, commentId){
        let weatherId = this.props.dataIndex;
        let weatherIndex = this.props.index;
        this.props.onDeleteCommentBtn(commentIndex, commentId, weatherIndex, weatherId);
    }

    render(){
        return(
            <li>
                <img className="weather-icon" src={this.props.icon}/>
                <span className="city-name">{this.props.city}</span>
                <span>{this.props.condition}</span>
                <span> {this.props.temp}° | C</span>
                <button type="button" onClick={this.onDeleteBtn}><i className="fa fa-trash"></i></button>
                <CommentForm onSubmitComment={this.onSubmitComment}/>
                <CommentList comments={this.props.comments} onDeleteCommentBtn={this.onDeleteCommentBtn}/>
            </li>
        );
    };
};

export default WeatherBox;