import React, { Component } from 'react';
import 'bootswatch/dist/lux/bootstrap.css';
import Navbar from './components/navbar.js';
import AdmNavBar from './components/AdmNavBar.js';
import './styles.css'; 
import AdminLogin from './components/AdmLogin.js';
import StarryBackground from "./components/StarryBackground.js";
import 'toastr/build/toastr.min';
import 'toastr/build/toastr.css';
import Rotas from './rotas.js';


class App extends Component {
  
  state = {
    showAdminLogin: false,
    isAdminLoggedIn: false, // Initialize based on prop
  };
  
  componentDidMount() {
    this.checkRoute();
    window.addEventListener('popstate', this.checkRoute);
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.checkRoute);
  }

  checkRoute = () => {
  const currentRoute = window.location.pathname;
  const isAdminRoute = currentRoute.includes('adm') && currentRoute !== '/adm';
  this.setState({ showAdminLogin: currentRoute === '/adm', isAdminLoggedIn: isAdminRoute });
}

  handleAdminLogin = (isLoggedIn) => {
    if (isLoggedIn) {
      // If isLoggedIn is true, set isAdminLoggedIn to true and showAdminLogin to false
      this.setState({ isAdminLoggedIn: true, showAdminLogin: false });
    } else {
      // If isLoggedIn is false, don't change the state of isAdminLoggedIn
      // Only update showAdminLogin to false
      this.setState({ showAdminLogin: false });
    }
  }

  render() {
    
    return (
      <div className={`app-container ${this.state.isAdminLoggedIn ? 'adm-background' : ''}`}>
        <Rotas />
        {this.state.isAdminLoggedIn ? null : <StarryBackground />}
        <div className={`container ${this.state.isAdminLoggedIn ? 'adm-background' : ''}`}>
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