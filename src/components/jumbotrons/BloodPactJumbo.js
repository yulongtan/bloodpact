import React, { Component } from "react";
import { Jumbotron, Button } from "reactstrap";
import landingImage from "../../img/landingPage/landingPageImg.jpg";

import "./BloodPactJumbo.css";

export class BloodPactJumbo extends Component {
	render() {
		return (
			<div>
				<Jumbotron
					fluid
					// style={{
					// 	backgroundImage: `url(${landingImage})`
					// }}
					className="jumbo"
				>
					<h1 className="display-4">
						Your blood has the power to help millions.
					</h1>
					<p className="lead">Donate. Save Lives.</p>
					<p className="lead">
						<Button
							className="jumboButton"
							buttonStyle={{ borderRadius: 50 }}
							style={{ borderRadius: 50 }}
							color="danger"
						>
							BECOME A DONOR TODAY
						</Button>
					</p>
				</Jumbotron>
			</div>
		);
	}
}
