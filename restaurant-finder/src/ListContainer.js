import React, { Component } from "react";
import RestaurantDetail from "./RestaurantDetail";
import ListComponent from "./ListComponent";
import InfiniteScroll from "react-infinite-scroller";
class ListContainer extends Component {
  selfReference;
  offset;

  address = "Peachtree Corners, GA, US";
  constructor(props) {
    super(props);
    this.selfReference = this;
    this.offset = 20;
  }

  loadMore() {
    this.props.loadMore();
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
              <InfiniteScroll
                pageStart={0}
                loadMore={this.loadMore.bind(this.selfReference)}
                hasMore={true || false}
                loader={
                  <div className="loader" key={0}>
                    Loading ...
                  </div>
                }
                useWindow={false}
              >
                {this.props.restaurants
                  ? this.props.restaurants.businesses.map((val, index) => {
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
                  : null}
              </InfiniteScroll>
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
