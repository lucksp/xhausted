import React, { Component } from "react";

class ReportForm extends Component {
  constructor(props) {
    super(props);

    this.stateSelected = this.stateSelected.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);

    this.state = {
      selectedState: null,
      dropdownClose: true
    };
  }

  componentWillMount() {
    this.fetchData();
  }

  stateSelected({ currentTarget }) {
    this.setState({
      selectedState: currentTarget.text,
      dropdownClose: !this.state.dropdownClose
    });
  }

  toggleDropdown() {
    this.setState({ dropdownClose: !this.state.dropdownClose });
  }

  fetchData() {
    fetch("/api/data")
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({ data: json });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="container flex center column report-form">
        <h3>We make it easy to report a smoking vehicle</h3>
        <p>For your safety, please do not use this while driving!</p>
        <div className="form-wrapper col-sm-8">
          {this.state.data && (
            <div className="dropdown-wrapper">
              <button
                className="btn btn-lg btn-green-blue button-state-select"
                onClick={this.toggleDropdown}
              >
                {this.state.selectedState
                  ? this.state.selectedState
                  : "Select Your State"}
              </button>
              <div
                className={
                  "dropdown-content" +
                  (!this.state.dropdownClose ? " open" : "")
                }
              >
                {Object.keys(this.state.data).map((state, i) => {
                  return (
                    <a key={i} className="option" onClick={this.stateSelected}>
                      {state}
                    </a>
                  );
                })}
              </div>
            </div>
          )}
          {this.state.selectedState && (
            <form>
              <fieldset className="field-set-contact">
                <div className="form-group row">
                  <label
                    htmlFor="inputEmail"
                    className="col-sm-3 col-form-label"
                  >
                    Email
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail"
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="inputName"
                    className="col-sm-3 col-form-label"
                  >
                    Name
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      id="inputName"
                      placeholder="Your Name"
                    />
                  </div>
                </div>
              </fieldset>
              <fieldset className="field-set-vehicle">
                <div className="form-group row">
                  <label
                    htmlFor="inputPlate"
                    className="col-sm-3 col-form-label"
                  >
                    License Plate
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      id="inputPlate"
                      placeholder="Vehicle Plate"
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <label
                    htmlFor="inputVehicle"
                    className="col-sm-3 col-form-label"
                  >
                    Vehicle Make/Model
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className="form-control"
                      id="inputVehicle"
                      placeholder="Vehicle Plate"
                    />
                  </div>
                </div>
              </fieldset>
              <fieldset className="field-set-other">
                <div className="form-group row">
                  <label className="col-sm-4">Submit as Anonymous??</label>
                  <div className="col-sm-8">
                    <div className="form-check">
                      <label className="form-check-label">
                        <input className="form-check-input" type="checkbox" />{" "}
                        Yes
                      </label>
                    </div>
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-sm-4">Receive a Copy?</label>
                  <div className="col-sm-8">
                    <div className="form-check">
                      <label className="form-check-label">
                        <input className="form-check-input" type="checkbox" />{" "}
                        Yes
                      </label>
                    </div>
                  </div>
                </div>
              </fieldset>
              <p>And we never save or share your information</p>
              <div className="form-group row">
                <div className="offset-sm-3 col-sm-9">
                  <button type="submit" className="btn btn-primary">
                    Sign in
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }
}

export default ReportForm;
