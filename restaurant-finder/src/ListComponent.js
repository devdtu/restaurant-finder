import React, { Component } from "react";

class ListComponent extends Component {
  restaurant;
  constructor(props) {
    super(props);
    this.restaurant = this.props.restaurant;

    console.log(this.props);
  }
  testFunction = () => {
    console.log(this.restaurant);
    // console.log(this.props.restaurants.businesses);
  };

  componentDidMount() {
    // this.setState({ restaurant: this.props.restaurant }, () => {
    //   console.log(this.props);
    //   console.log(this.props.restaurant);
    //   console.log(this.state);
    // });
    // console.log(this.state);
    // this.restaurant = this.props;
  }
  render() {
    return this.restaurant ? (
      <div className="row">
        <div className="col-md-12 py-3">
          <div className="font-weight-bold">{this.restaurant.name}</div>
          <div>{this.restaurant.location.address1}</div>
          <div>{this.restaurant.is_closed ? "Closed" : "Open"}</div>
        </div>
      </div>
    ) : null;
  }
}

export default ListComponent;
