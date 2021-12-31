import React, { useState } from 'react';
import './App.css';
import PostsDisplay from './PostManagement/PostsDisplay';
import AddPost from './PostManagement/AddPost';

function App() {
  /* For milestone 3, I need 2 child components to communicate.
  PostsDisplay needs to know when AddPost is submitted but 2 siblings can't directly communicate
  Instead, each child talks to the parent (App) + gets the other child's updates from App.

  1. numPosts = passed to PostsDisplay, used as useEffect dependency so PostsDisplays rerenders
  whenever numPosts changes
  2. updateNumPosts is passed to AddPosts, so AddPosts can call it to update numPosts in App when
  a new post is submitted
  3. then whenever a new post is submitted PostsDisplay will rerender and show the new post

  App (parent) passes var + fx DOWN to both children. AddPosts passes event UP to App. App passes
  var DOWN to PostsDisplay. */
  const [numPosts, setNumPosts] = useState(0);
  const updateNumPosts = () => {
    setNumPosts(numPosts + 1);
  };

  return (
    <div className="centered">
      {/* Data flows DOWN from parent to child */}
      <PostsDisplay numPosts={numPosts} />
      {/* Events can flow UP from child to parent */}
      <AddPost updateNumPosts={updateNumPosts} />
    </div>
  );
}

export default App;
