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
import Slideshow from './components/slideshow';

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
      this.setState({ isAdminLoggedIn: true, showAdminLogin: false });
    } else {
      this.setState({ showAdminLogin: false });
    }
  }

  render() {
    const { isAdminLoggedIn, showAdminLogin } = this.state;

    return (
      <div className={`app-container ${isAdminLoggedIn ? 'adm-background' : ''}`}>
        <Rotas />
        {isAdminLoggedIn ? null : <StarryBackground />}
        <div className={`container ${isAdminLoggedIn ? 'adm-background' : ''}`}>
          {isAdminLoggedIn ? <AdmNavBar /> : <Navbar />}
          {showAdminLogin && !isAdminLoggedIn ? (
            <AdminLogin onAdminLogin={this.handleAdminLogin} />
          ) : null}
          {window.location.pathname == '/' ? <Slideshow /> : null}
        </div>
      </div>
    );
  }
}

// const SlideshowContainer = () => {
//   const images = [
//     'https://compote.slate.com/images/721112a8-1fa9-4a48-8eeb-0c4f29e0d8f6.jpeg?crop=1554%2C1036%2Cx2%2Cy0',
//      'https://m.media-amazon.com/images/I/91RzpxQktRL._AC_SY741_.jpg',
//      'https://static.ipic.com/filmimage/HO00002806/Napoleon.jpg?width=400&maxWidth=400',
//   ];

//   return (
//     <div>
//       <Slideshow images={images} />
//     </div>
//   );
// };

export default App;