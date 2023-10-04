import React, { Component } from 'react';
import 'bootswatch/dist/lux/bootstrap.css';
import Navbar from './components/navbar.js';
import AdmNavBar from './components/AdmNavBar.js';
import './styles.css'; 
import AdminLogin from './components/AdmLogin.js';
import StarryBackground from "./components/StarryBackground.js";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAdminLogin: false,
      isAdminLoggedIn: false,
    };
  }

  componentDidMount() {
    this.checkRoute();
    window.addEventListener('popstate', this.checkRoute);
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.checkRoute);
  }

  checkRoute = () => {
    const currentRoute = window.location.pathname;
    this.setState({ showAdminLogin: currentRoute === '/adm' });
  }

  handleAdminLogin = (isLoggedIn) => {
    this.setState({ isAdminLoggedIn: isLoggedIn, showAdminLogin: !isLoggedIn });
  }

  render() {
    return (
      <div>
          <StarryBackground />
        <div className='container'>
          {this.state.isAdminLoggedIn ? <AdmNavBar /> : <Navbar />}
          {this.state.showAdminLogin && !this.state.isAdminLoggedIn ? (
            <AdminLogin onAdminLogin={this.handleAdminLogin} />
          ) : null}
        </div>
      </div>
    );
  }
}

export default App;