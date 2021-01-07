import React from 'react';
import { Switch, Route } from 'react-router-dom';

import './App.css';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Landing from './components/Landing/Landing';
import Home from './components/Home/Home';
import Profile from './components/Profile/Profile';
import GetStarted from './components/GetStarted/GetStarted';

//TODO Web Template Studio: Add routes for your new pages here.
class App extends React.Component {
	state = { loading: true, drizzleState: null };

	componentDidMount () {
		const { drizzle } = this.props;

		// subscribe to changes in the store
		this.unsubscribe = drizzle.store.subscribe(() => {
			// every time the store updates, grab the state from drizzle
			const drizzleState = drizzle.store.getState();

			// check to see if it's ready, if so, update local component state
			if (drizzleState.drizzleStatus.initialized) {
				this.setState({ loading: false, drizzleState });
			}
		});
	}

	componentWillUnmount () {
		this.unsubscribe();
	}

	render () {
		if (this.state.loading) return 'Loading Drizzle...';
		return (
			<React.Fragment>
				<NavBar />
				<Switch>
					<Route exact path="/" component={Landing} />
					<Route
						path="/Home"
						render={(props) => <Home drizzle={this.props.drizzle} drizzleState={this.state.drizzleState} />}
					/>
					<Route
						path={["/Profile/:uid", "/Profile"]}
						render={(props) => (
							<Profile {...props} drizzle={this.props.drizzle} drizzleState={this.state.drizzleState} />
						)}
					/>
					<Route path="/GetStarted" component={GetStarted} />
				</Switch>
				<Footer />
			</React.Fragment>
		);
	}
}

export default App;
