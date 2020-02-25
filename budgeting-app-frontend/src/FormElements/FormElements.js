import React, { Component } from "react";
import './FormElements.css';
import DatePicker from 'react-datepicker';
// import moment from 'moment';
// import InputMoment from 'input-moment';
import "react-datepicker/dist/react-datepicker.css";

class FormElements extends Component {

    state = {
        date: new Date()
      };

    constructor (props) {
        super(props)
        this.state = {
          startDate: new Date()
        };
        this.handleChange = this.handleChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
      }
    
      handleChange(date) {
        this.setState({
          startDate: date
        })
      }
    
      onFormSubmit(e) {
        e.preventDefault();
      }

      handleSave = () => {
        console.log('saved', this.state.m.format('llll'));
      };

  onChange = date => this.setState({ date });

  render() {
    let formElement = null;

    switch (this.props.elementType) {
      case "input":
        formElement = (
          <div>
            <label>{this.props.label}</label>
            <input
              type="input"
              className="form-control"
              id={this.props.formElementId}
            />
          </div>
        );
        break;
      case "email":
        formElement = (
          <div>
            <label>{this.props.label}</label>
            <input
              type="email"
              className="form-control"
              id={this.props.formElementId}
            />
          </div>
        );
        break;
      case "textarea":
        formElement = (
          <div>
            <label>{this.props.label}</label>
            <input
              type="textarea"
              className="form-control"
              id={this.props.formElementId}
            />
          </div>
        );
        break;
      case "date":
        formElement = (
          <div>
            <label>{this.props.label}</label>
            <DatePicker
              type="input"
              className="form-control DatePicker"
              selected={ this.state.startDate }
              onChange={ this.handleChange }
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={5}
              timeCaption="Set Time"
              dateFormat="yyyy/MM/dd hh:mm aa" />
            {/* <InputMoment
              moment={this.state.moment}
              onChange={this.handleChange}
              onSave={this.handleSave}
              minStep={1} // default
              hourStep={1} // default
              prevMonthIcon="ion-ios-arrow-left" // default
              nextMonthIcon="ion-ios-arrow-right" // default
            /> */}
          </div>
        );
        break;
    case "select":
        formElement = (
            <div>
                <label>{this.props.label}</label>
                <select type="select" class="form-control" id={this.props.formElementId}>
                    {this.props.options.map((result) => (
                        <option value={result}>
                            {result}
                        </option>
                    ))}
                </select>
            </div>
        );
        break;
    case "buttonSuccess":
        formElement = (
            <div className="ButtonSuccess">
                <button type="button" class="btn btn-success">Submit</button>
            </div>
        );
        break;
    case "buttonPrimary":
        formElement = (
            <div className="ButtonPrimary">
                <button type="button" class="btn btn-primary">Submit</button>
            </div>
        );
        break;
      default:
        formElement = <input />;
        break;
    }

    return (
        <div className="form-group">
            {formElement}
        </div>
    );
  }
}

export default FormElements;
