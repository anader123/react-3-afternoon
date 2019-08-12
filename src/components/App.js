import React, { Component } from 'react';
import axios from 'axios'; 

import './App.css';
import Post from './Post/Post'; 
import Header from './Header/Header';
import Compose from './Compose/Compose';
import { runInThisContext } from 'vm';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

  }
  
  componentDidMount() {
    const baseURL = 'https://practiceapi.devmountain.com/api'
    const promise = axios.get(`${baseURL}/posts`); 
    promise.then(response => {
      this.setState({
        posts: response.data
      })
    })
  }

 updatePost = (id, text) => {
  const baseURL = 'https://practiceapi.devmountain.com/api'
  const promise = axios.put(`${baseURL}/posts?id=${id}`, { text }); 
  promise.then(response => {
    this.setState({
      posts: response.data
    })
  })
  }

  deletePost = (id) => {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${ id }`).then( results => {this.setState({ posts: results.data })});
  }

  createPost = ( text ) => {
    axios.post('https://practiceapi.devmountain.com/api/posts', { text })
    .then( results => { this.setState({posts: results.data})})
  }

  render = () => {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={ this.createPost } />
          {
            posts.map( posts => (
              <Post key={ posts.id } 
                    text={ posts.text } 
                    date={ posts.date } 
                    updatePostFn={ this.updatePost }
                    deletePostFn={ this.deletePost }/> 
            ))
          }
        </section>
      </div>
    );
  }
} 

export default App;
