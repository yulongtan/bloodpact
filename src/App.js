import React, { Component } from "react";
import { Redirect, Route, Switch } from "react-router";
import "./App.css";
import { MainNavBar } from "./components/navs/MainNavBar";
import { HomeView } from "./components/views/HomeView";
import { SignUpView } from "./components/views/SignUpView";
import { SignInView } from "./components/views/SignInView";
import { BloodPactFooter } from "./components/footers/BloodPactFooter";
import firebase from "firebase/app";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			errorMessage: null
		};
	}

	componentDidMount() {
		this.authUnregFunc = firebase.auth().onAuthStateChanged(firebaseUser => {
			// If user is logged in
			if (firebaseUser) {
				this.setState({ user: firebaseUser });
			} else {
				this.setState({
					firebaseUser: null,
					user: null
				});
			}
		});
	}

	handleSignUp = user => {
		if (user.password !== user.passwordConfirmation) {
			this.setState({ errorMessage: "Passwords do not match" });
			return;
		} else {
			// Create user with Firebase
			firebase
				.auth()
				.createUserWithEmailAndPassword(user.email, user.password)
				.then(userCredentials => {
					console.log(userCredentials.user);
					return userCredentials.user;
				})
				.then(fbUser => {
					let userRef = firebase.database().ref(`people/${fbUser.uid}`);
					console.log(user);
					userRef.set({
						firstName: user.firstName,
						lastName: user.lastName,
						birthdate: user.birthdate,
						email: user.email
					});
					fbUser
						.updateProfile({
							displayName: user.firstName
						})
						.then(() => {
							this.setState({
								displayName: user.firstName
							});
						})
						.catch(err => {
							this.setState({ errorMessage: err.message });
						});
				})
				.catch(err => {
					this.setState({ errorMessage: err.message });
				});
		}
	};

	handleSignIn = user => {
		if (!user.email || !user.password) {
			this.setState({ errorMessage: "Fields cannot be left blank." });
		}
		this.setState({ errorMessage: null });
		firebase
			.auth()
			.signInWithEmailAndPassword(user.email, user.password)
			.catch(err => {
				this.setState({ errorMessage: err.message });
			});
	};

	handleSignOut = () => {
		this.setState({ errorMessage: null });
		firebase
			.auth()
			.signOut()
			.catch(err => {
				this.setState({ error: err.message });
			});
	};

	render() {
		let signUpView = routerProps => {
			return (
				<SignUpView
					{...routerProps}
					errorMessage={this.state.errorMessage}
					handleSignUp={this.handleSignUp}
				/>
			);
		};

		let signInView = routerProps => {
			return (
				<SignInView
					{...routerProps}
					errorMessage={this.state.errorMessage}
					handleSignIn={this.handleSignIn}
				/>
			);
		};

		let nav;
		if (this.state.user) {
			console.log(this.state.user);
			nav = (
				<MainNavBar
					displayName={this.state.user.displayName}
					email={this.state.user.email}
					handleSignOut={this.handleSignOut}
				/>
			);
		} else {
			nav = <MainNavBar />;
		}

		return (
			<div className="App">
				{nav}
				<Switch>
					<Route exact path={"/"} component={HomeView} />
					<Route path="/signup/" render={signUpView} />
					<Route path="/signin/" render={signInView} />
					<Redirect to={"/"} />
				</Switch>
				<BloodPactFooter />
			</div>
		);
	}
}

export default App;
