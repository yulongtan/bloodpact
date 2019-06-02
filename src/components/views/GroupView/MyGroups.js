import React, { Component } from "react";
import {
	Card,
	Button,
	Container,
	CardImg,
	CardTitle,
	CardText,
	CardDeck,
	CardSubtitle,
	CardBody,
	Row,
	CardColumns,
	Col,
	ListGroup,
	ListGroupItem,
	Badge,
	ButtonGroup
} from "reactstrap";
import "./MyGroups.css";
import picture from "../../../img/logos/blood-pact-logo.png";
import pie from "../../../img/left-panel/pie-chart.png";
import { GroupsPlot } from "./GroupsPlot.js";
import { getUserGroups, leaveGroup } from "../../../services/CapstoneApi";

export class MyGroups extends Component {
	constructor(props) {
		super(props);
		this.leaveGroup = this.leaveGroup.bind(this);
		this.state = {
			name: "Please Select a Group",
			friendlyName: "",
			createdDate: "",
			members: {},
			pintsDonated: 0,
			groups: {}
		};
	}

	componentDidMount() {
		getUserGroups(this.props.uid).then(result =>
			this.setState({
				groups: result
			})
		);
	}

	handleClick = (e, data) => {
		this.setState({
			name: data.name,
			members: data.members
		});

		console.log("state members" + this.state.members);
	};

	handleLeaveGroup = groupName => {
		leaveGroup(groupName, this.props.uid);
	};

	// Madison
	leaveGroup = e => {
		console.log(this.state.name);
		console.log(e.target);
	};

	render() {
		// const items = Object.keys(this.state.members).map((member, index) => {
		// 	return (
		// 		<ListGroupItem className="justify-content-between" key={index}>
		// 			<div className="member-row">
		// 				<span className="member-name">
		// 					{this.state.members[member].firstName +
		// 						" " +
		// 						this.state.members[member].lastName}
		// 				</span>
		// 				<span className="float-right">
		// 					{this.state.members[member].pintsDonated} Pints
		// 				</span>
		// 			</div>
		// 		</ListGroupItem>
		// 	);
		// });

		let groups = Object.keys(this.state.groups).map((group, index) => {
			return (
				<Card
					className="single-card"
					id={this.state.groups[group].friendlyName}
					key={index}
					defaultChecked={false}
					onClick={e => this.handleClick(e, group[index])}
				>
					{/* <CardImg top src="" alt="Card image cap" /> */}
					<CardBody
						className="single-card-body"
						style={{ textAlign: "center" }}
					>
						<CardTitle>{this.state.groups[group].name}</CardTitle>
						<div className="card-sub">
							<CardSubtitle className="member">
								<span className="member-number">
									{" "}
									{Object.keys(this.state.groups[group].members).length}
								</span>
								<span> Members</span>
							</CardSubtitle>
						</div>
						<ButtonGroup vertical className="button-group">
							{/* <Button className="bg-info">Info</Button> */}
							<Button
								onClick={this.leaveGroup}
								// onClick={this.handleLeaveGroup(this.state.groups[group].name)}
								className="leave-group-button"
								color="danger"
							>
								Leave
							</Button>
						</ButtonGroup>
					</CardBody>
				</Card>
			);
		});

		return (
			<div className="my-group">
				<Row>
					<Col md={8}>
						<div className="groups-left-section">
							<CardColumns md={4} className="card-col">
								{groups}
							</CardColumns>
						</div>
					</Col>
					<Col md={4}>
						<Card>
							<CardImg top src="" alt="Card image cap" />
							<CardBody>
								<CardTitle>{this.state.name}</CardTitle>
								<CardSubtitle style={{ textAlign: "center" }}>
									{Object.keys(this.state.members).length} Members
								</CardSubtitle>
								<p>Members</p>
								<ListGroup>
									<ListGroupItem className="justify-content-between">
										<div className="member-row">
											<p className="member-name"> Madison S.</p>
											<p className="pints-donated">14 Pints</p>
										</div>
									</ListGroupItem>
									<ListGroupItem className="justify-content-between">
										<div className="member-row">
											<p className="member-name"> Varun M.</p>
											<p className="pints-donated">5 Pints</p>
										</div>
									</ListGroupItem>
									<ListGroupItem className="justify-content-between">
										<div className="member-row">
											<p className="member-name"> Yulong T.</p>
											<p className="pints-donated">1 Pints</p>
										</div>
									</ListGroupItem>
								</ListGroup>
								<div id="groups-plot-container">
									<div id="group-plot-title">Goal</div>
									<GroupsPlot id="test" />
									<div id="group-plot-stat">200 Pints</div>
								</div>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
}
