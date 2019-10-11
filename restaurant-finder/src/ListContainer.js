import React, { Component } from "react";
import RestaurantDetail from "./RestaurantDetail";
import ListComponent from "./ListComponent";
class ListContainer extends Component {
  selfReference;
  constructor(props) {
    super(props);
    this.selfReference = this;
  }

  selectRestaruant(restaurant) {
    this.props.selectRestaurant(restaurant);
  }

  goBack() {
    this.props.deSelectRestaurant();
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
                    <ListComponent
                      restaurantSelected={this.selectRestaruant.bind(
                        this.selfReference
                      )}
                      restaurant={val}
                      key={index}
                    ></ListComponent>
                  );
                })
              ) : null
            ) : (
              <RestaurantDetail
                restaurant={this.props.selectedRestaurant}
                goback={this.goBack.bind(this.selfReference)}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default ListContainer;
