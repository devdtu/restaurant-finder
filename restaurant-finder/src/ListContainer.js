import React, { Component } from "react";
import RestaurantDetail from "./RestaurantDetail";
import ListComponent from "./ListComponent";
class ListContainer extends Component {
  render() {
    const testVar = true;
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            {!testVar ? <ListComponent /> : <RestaurantDetail />}
          </div>
        </div>
      </div>
    );
  }
}

export default ListContainer;
