import React, {
  Component
} from 'react';
// import './App.css';
import SearchForm from './SearchForm';
import WeatherListBox from './WeatherListBox';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: []
    };
    this.onSubmitForm = this.onSubmitForm.bind(this);
    this.onClickDelete = this.onClickDelete.bind(this);
    this.onSubmitComment = this.onSubmitComment.bind(this);
    this.onDeleteCommentBtn = this.onDeleteCommentBtn.bind(this);
  };

  componentDidMount(){
    this.fetch();
  }

  fetch(){
    axios.get('/weather')
    .then(res=>{
      console.log(res);
      this.setState({weather:res.data})
    })
  }

    onSubmitComment(data, id, index){
      console.log(data, id);
        axios.post('/weather/'+ id+ '/comment', data)
        .then(res=>{
            console.log(res.data.comments);
            this.setState((prevState) => {
              let newWeather = prevState.weather.map((item, i)=>{
                if (i === index){
                  item = res.data;
                }
                return item;
              });
            return {weather: newWeather};
          })
        })
        .catch(function (error) {
            console.log(error);
          })
    }

  onSubmitForm(data) {
    console.log(data);
    axios.post('/weather', data)
    .then(res=>{
    this.setState(prevState => ({
      weather: [...prevState.weather, res.data]
    }))}
    )
    .catch(function (error) {
      console.log(error);
    })
  };

  onClickDelete(id, index) {
    console.log(this.state.weather);
    axios.delete('delete/weather/' + id)
    .then(res=>{
      this.setState((state) => { 
        let newWeather = state.weather.filter ((item,i)=>i!==index);
        return {weather:newWeather};
      }, ()=>console.log(this.state.weather));
    })
    .catch(function (error) {
      console.log(error);
    })
  };

  onDeleteCommentBtn(commentIndex, commentId, weatherIndex, weatherId){
    axios.delete('/delete/weather/'+ weatherId +'/comments/' + commentId)
    .then(res=>{
      this.setState((prevState)=>{
        let newWeather = prevState.weather.map((item, i)=>{
          if (i === weatherIndex){
            item = res.data;
          }
          return item;
        });
      return {weather: newWeather};
        })
    })
  }

  render() {
    return ( 
      <div className = "container" >
        <div className = "page-header" >
          <h3 className = "main-hdl" > Weather React app </h3> 
          <SearchForm onSubmitForm = {this.onSubmitForm}/> 
        </div> 
        <WeatherListBox weather = {this.state.weather} onClickDelete = {this.onClickDelete} onSubmitComment={this.onSubmitComment} onDeleteCommentBtn={this.onDeleteCommentBtn}/> 
      </div>
    );
  }
}

export default App;