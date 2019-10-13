import React, { Component } from "react";
import StarRatings from "../node_modules/react-star-ratings";
// https://www.npmjs.com/package/react-star-ratings
class ListComponent extends Component {
  selfReference;
  constructor(props) {
    super(props);
    this.selfReference = this;
  }

  selectRestaurant() {
    this.props.restaurantSelected(this.props.restaurant);
  }

  render() {
    return this.props.restaurant ? (
      <div
        onClick={this.selectRestaurant.bind(this.selfReference)}
        className="row restaurent-list-component"
      >
        <div className="col-md-12 py-2">
          <div className="row">
            <div className="col-md-8">
              <div className="font-weight-bold">
                {this.props.restaurant.name}
              </div>
              <div>
                <StarRatings
                  rating={this.props.restaurant.rating}
                  starRatedColor="orange"
                  numberOfStars={5}
                  name="rating"
                />
              </div>
              <div>{this.props.restaurant.location.address1}</div>
              <div>{this.props.restaurant.is_closed ? "Closed" : "Open"}</div>
            </div>
            <div className="col-md-4">
              <img
                className="restaurant-list-image"
                src={this.props.restaurant.image_url}
              ></img>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}

export default ListComponent;
