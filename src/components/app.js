import { h, Component } from 'preact';
import { Router, route } from 'preact-router';
import style from './style';
// Code-splitting is automated for routes
import Home from '../routes/home';
import Profile from '../routes/profile';
import Post from '../routes/post';

export default class App extends Component {
  /** Gets fired when the route changes.
   *	@param {Object} event		'change' event from [preact-router](http://git.io/preact-router)
   *	@param {string} event.url	The newly routed URL
   */
  handleRoute = e => {
    this.currentUrl = e.url;
  };

  render() {
    return (
      <div id="app">
        <main className={style.content}>
          <Router onChange={this.handleRoute}>
            <Home path="/" />
            <Post path="/posts/:postId" />
            <Profile path="/profile/" user="me" />
            <Profile path="/profile/:user" />
          </Router>
        </main>
      </div>
    );
  }
}
