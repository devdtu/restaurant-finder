import React, { Component } from "react";
import StarRatings from "../node_modules/react-star-ratings";

class RestaurantDetail extends Component {
  selfReference;
  goBack() {
    this.props.goback();
  }

  constructor() {
    super();
    this.selfReference = this;
  }

  render() {
    const address = this.props.restaurant.location.display_address.join(", ");

    return (
      <div className="container-fluid">
        <div className="row">
          <div
            onClick={this.goBack.bind(this.selfReference)}
            className="col-md-2 py-2"
          >
            <img className="back-image" src={require("./back.png")}></img>
          </div>
          <div className="col-md-10 d-flex align-items-center pl-4">
            <h4>{this.props.restaurant.name}</h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <img
              className="restaurant-image"
              src={this.props.restaurant.image_url}
            ></img>
          </div>
        </div>
        <div>
          <StarRatings
            rating={this.props.restaurant.rating}
            starRatedColor="orange"
            numberOfStars={5}
            name="rating"
          />
        </div>
        <div className="pt-2">
          <span className="font-weight-bold">Category : </span>
          {this.props.restaurant.categories[0].title}
        </div>
        <div className="pt-2">
          <span className="font-weight-bold">Address : </span>
          {address}
        </div>
        <div>
          <span className="font-weight-bold">Phone : </span>
          {this.props.restaurant.display_phone}
        </div>
        <div>
          <a target="blank" href={this.props.restaurant.url}>
            {" "}
            View Details
          </a>
        </div>
      </div>
    );
  }
}

export default RestaurantDetail;
