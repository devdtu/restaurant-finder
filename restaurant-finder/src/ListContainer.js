import React, { Component } from "react";
import RestaurantDetail from "./RestaurantDetail";
import ListComponent from "./ListComponent";
class ListContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12 pr-0 list-container-restaurant">
            {!this.props.selectedRestaurant ? (
              this.props.restaurants ? (
                this.props.restaurants.businesses.map((val, index) => {
                  return (
                    <ListComponent restaurant={val} key={index}></ListComponent>
                  );
                })
              ) : null
            ) : (
              <RestaurantDetail />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ListContainer;
