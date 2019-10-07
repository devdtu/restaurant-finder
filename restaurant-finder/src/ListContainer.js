import React, { Component } from "react";
import RestaurantDetail from "./RestaurantDetail";
import ListComponent from "./ListComponent";
class ListContainer extends Component {
  constructor(props) {
    super(props);

    console.log(this.props);
  }

  // testFunction = () => {
  //   console.log(this.props);
  // };
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            {!this.props.selectedRestaurant ? (
              this.props.restaurants ? (
                this.props.restaurants.businesses.map((val, index) => {
                  return (
                    <ListComponent restaurant={val} key={index}></ListComponent>
                  );
                })
              ) : null
            ) : (
              // <ListComponent restaurants={this.props.restaurants} />
              <RestaurantDetail />
            )}
          </div>

          {/* <div onClick={this.testFunction}>test</div> */}
        </div>
      </div>
    );
  }
}

export default ListContainer;
