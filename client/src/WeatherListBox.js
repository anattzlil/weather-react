import React, {Component} from 'react';
import WeatherBox from './WeatherBox.js';

class WeatherListBox extends Component {
    constructor(props){
        super(props);
        this.onClickDelete = this.onClickDelete.bind(this);
        this.onSubmitComment = this.onSubmitComment.bind(this);
        this.onDeleteCommentBtn = this.onDeleteCommentBtn.bind(this);
    }

onClickDelete(id, index){
    console.log(id);
    this.props.onClickDelete(id, index);
};

renderWeather(){
    var arr = this.props.weather;
    console.log (arr);
    return arr.map((weather, index)=>
    <WeatherBox key={index} {...weather} dataIndex={weather._id} index={index} onClickDelete={this.onClickDelete} onSubmitComment={this.onSubmitComment} onDeleteCommentBtn={this.onDeleteCommentBtn}/>
);
}

onSubmitComment(data, id, index){
    this.props.onSubmitComment(data, id, index);
    console.log(data, id, index);
}
onDeleteCommentBtn(commentIndex, commentId, weatherIndex, weatherId){
    this.props.onDeleteCommentBtn(commentIndex, commentId, weatherIndex, weatherId);
}

    render(){
        return(
            <ul>
               {this.renderWeather()} 
            </ul>
        );
    };
}

export default WeatherListBox;