import React, {Component} from 'react';
import axios from 'axios';

class SearchForm extends Component{
    constructor(props){
    super(props);
    this.state=({input:""});
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleBtnClick = this.handleBtnClick.bind(this);
    }

    handleInputChange(e){
        var input = e.target.value;
        this.setState({input: input});
        console.log(this.state);
    }

    handleBtnClick(e){
        e.preventDefault();
        var city = this.state.input;
        var url = 'http://api.apixu.com/v1/current.json?key=7455f371a430472baa6122616180502&q='
        axios.get(url + city)
        .then(res => {
            var weather = {
                city: res.data.location.name,
                temp: res.data.current.temp_c,
                condition: res.data.current.condition.text,
                icon: res.data.current.condition.icon,
                comments:[]
            };
            console.log(weather);
            this.props.onSubmitForm(weather);
            this.setState({input:""});
            

        })  
        .catch(error => {
            console.log('error fetching weather');
        });    
    };

    render(){
        return(
            <div>
                <form onSubmit={this.handleBtnClick}>
                <input type="text" placeholder="Enter city" value={this.state.input} onChange = {this.handleInputChange}/>
                <button type="submit" className="city-btn btn">Go!</button>
                </form>
            </div>
        );
    };
};

export default SearchForm;