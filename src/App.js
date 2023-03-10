import {Switch, Route, Redirect} from 'react-router-dom'
import {Component} from 'react'
import './App.css'
import Login from './components/Login'
import Home from './components/Home'
import ReactContext from './Context/ReactContext'
import Bookshelves from './components/Bookshelves'
import BookDetails from './components/BookDetails'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

class App extends Component {
  state = {navItemsHide: true, headerActiveTabHome: true}

  toggleNavItemsHide = () => {
    this.setState(prevState => ({navItemsHide: !prevState.navItemsHide}))
  }

  onChangeHeaderActiveTabFalse = () => {
    this.setState({
      headerActiveTabHome: false,
    })
  }

  onChangeHeaderActiveTabTrue = () => {
    this.setState({
      headerActiveTabHome: true,
    })
  }

  render() {
    const {navItemsHide, headerActiveTabHome} = this.state
    console.log(headerActiveTabHome)
    return (
      <ReactContext.Provider
        value={{
          navItemsHide,
          toggleNavItemsHide: this.toggleNavItemsHide,
          headerActiveTabHome,
          onChangeHeaderActiveTabFalse: this.onChangeHeaderActiveTabFalse,
          onChangeHeaderActiveTabTrue: this.onChangeHeaderActiveTabTrue,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/shelf" component={Bookshelves} />
          <ProtectedRoute exact path="/books/:id" component={BookDetails} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </ReactContext.Provider>
    )
  }
}

export default App
