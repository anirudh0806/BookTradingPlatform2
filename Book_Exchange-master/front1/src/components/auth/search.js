import react, {Component} from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';
import './search.css'

class Search extends Component{

  constructor(props){
    super(props);
    this.state = {
      data: [],
      isLoaded: false,
    }
  }
  componentDidMount() {
         fetch("http://localhost:5000/users/search")
         .then(res => res.json())
         .then(json => {
           this.setState({
             isLoaded: true,
             data: json,
           })
         })
  }

handleClick(e) {
  const id = e.currentTarget.id
  const data ={
    id: id
  }
  var result = window.confirm("Are you sure you want to buy the book?")
  if(result){
  Axios.post("http://localhost:5000/users/delete",data)
       .then(res => {
         alert("Purchase Successful")
         window.location.reload(true)
       })
}
}
  render(){

    var {isLoaded , data} = this.state

    if(!isLoaded){
      return <div> Loading </div>
    }

    else{
      return(
        <div className="whole">
          <div className="title"><b>LIBRARY</b></div>
        <button className="back_btn"><Link to="/profile" className="link"> Back </Link></button>
          <ul>
            <div >

                {data.map(item => (
                  <div>
                    <li key = {item._id} className="main1">
                      <br/>
                      <p className="details">BookName : <b>{item.bookName}</b> </p>
                      <p className="details">Author : <b>{item.author}</b></p>
                      <p className="details">Email : <b>{item.email}</b></p>
                      <p className="details">Phone : <b>{item.phoneno}</b></p>
                      <button className="details_btn" id = {item._id} onClick = {this.handleClick}> BUY </button>
                      <br/>
                    </li>
                    <br/>
                   </div>

                ))}
                <br/>
            </div>
          </ul>
        </div>
      )
    }
}
}
export default Search
