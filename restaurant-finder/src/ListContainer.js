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

  getRestaurants() {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", () => {
      console.log(this.offset);
      this.offset += 20;
      let restaurants = JSON.parse(xhr.responseText);
      restaurants.businesses.forEach(element => {
        if (this.props.restaurants) {
          this.props.restaurants.businesses.push(element);
        }
      });
      this.setState(
        { restaurants: JSON.parse(xhr.responseText), selectedRestaurant: null },
        () => {
          console.log(this.state);
        }
      );
    });
    var url = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=restaurants&location=${this.address}&offset=${this.offset}`;
    xhr.open("GET", url);
    xhr.setRequestHeader(
      "Authorization",
      "Bearer " +
        "wfjGJjybjdhG0J0LVynQTGytYSx3wWFq86tLagik1Q4VuQNV_RsSMldrz3tdjk_0oC30nRp1ba3PsvsXg1s5c7fx3Wcz9_ZgUcczJpRBcbXd2qLv2_TUH6s64KKbXHYx"
    );
    xhr.setRequestHeader("Accept", "*/*");
    xhr.send();
  }

  selectRestaruant(restaurant) {
    this.props.selectRestaurant(restaurant);
  }

  loadFunc(data) {
    console.log(data);
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
                loadMore={this.getRestaurants.bind(this.selfReference)}
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
