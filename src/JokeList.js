import React, { Component } from 'react'
import axios from 'axios';
import './JokeList.css'
import Joke from './Joke';
import uuid from 'react-uuid'

class JokeList extends Component {
    static defaultProps={
        numJokesToGet:10
    };
    constructor(props){
        super(props);
        this.state={jokes:[]};
    }
   async  componentDidMount(){
        //Load Jokes
        let jokes=[];
        while(jokes.length<this.props.numJokesToGet){
            let res= await axios.get("https://icanhazdadjoke.com/",{headers:{Accept:"application/json"}})
        
    jokes.push({id:uuid(),text: res.data.joke,votes:0});
        }
      this.setState({jokes:jokes});
    }
    
    handleVote(id,delta){
        this.setState(st=>({
            jokes:st.jokes.map(j=>
                j.id==id?{...j,votes:j.votes+delta}:j
                )
        }))
    }
  render() {
    return (
      <div className='JokeList'>
        <div className='JokeList-sidebar'>
        <h1 className='JokeList-title'><span>Dad</span>Jokes</h1>
        <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg'/>
        <button className='JokeList-getmore'>New Jokes</button>
        </div>
        
        <div className='JokeList-jokes'>
           {this.state.jokes.map(j=>(
          <Joke key={j.id} votes={j.votes} text={j.text} upvote={()=>this.handleVote(j.id,1)} downvote={()=>this.handleVote(j.id,-1)}/>
           ) )
            }
        </div>
      </div>
    )
  }
}
export default JokeList;

