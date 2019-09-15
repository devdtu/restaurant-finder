import React, { Component } from "react";
import ListContainer from "./ListContainer";
import MapContainer from "./MapContainer";

class App extends Component {
  state;

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <div className="row">
              <div className="col-md-6">
                <ListContainer></ListContainer>
              </div>
              <div className="col-md-6">
                <MapContainer></MapContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
