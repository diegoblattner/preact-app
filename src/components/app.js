import { h, Component } from 'preact';
import { Router, route } from 'preact-router';
import style from './style.css';
// Code-splitting is automated for routes
import Home from '../routes/home';
import Post from '../routes/post';

class App extends Component {
  constructor() {
    super();

    /** Gets fired when the route changes.
     *	@param {Object} event		'change' event from [preact-router](http://git.io/preact-router)
     *	@param {string} event.url	The newly routed URL
     */
    this.handleRoute = e => {
      this.currentUrl = e.url;
    };
  }

  render() {
    return (
      <div id="app">
        <main className={style.content}>
          <Router onChange={this.handleRoute}>
            <Home path="/" />
            <Post path="/posts/:postId" />
          </Router>
        </main>
      </div>
    );
  }
}

export { App };
