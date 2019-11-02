import React from 'react';
import { connect } from 'react-redux';
import store, { updateUserThunk } from '../store';
import axios from 'axios';

class _UpdateUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      username: '',
      email: '',
      password: '',
      firstName: '',
      lastName: '',
      streetAddress: '',
      city: '',
      state: '',
      zipcode: '',
      billStreetAddress: '',
      billCity: '',
      billState: '',
      billZipcode: '',
      wishlist: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount(props) {
    const user = (await axios.get(`api/users/${this.props.match}`)).data;
    this.setState({
      id: user[0].id,
      username: user[0].username,
      email: user[0].email,
      password: user[0].password,
      firstName: user[0].firstName,
      lastName: user[0].lastName,
      streetAddress: user[0].streetAddress,
      city: user[0].city,
      state: user[0].state,
      zipcode: user[0].zipcode,
      billStreetAddress: user[0].billStreetAddress,
      billCity: user[0].billCity,
      billState: user[0].billState,
      billZipcode: user[0].billZipcode,
      wishlist: user[0].wishlist
    });
  }
  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value });
  }
  handleSubmit(ev) {
    ev.preventDefault();
    const id = this.props.match;
    const {
      username,
      email,
      password,
      firstName,
      lastName,
      streetAddress,
      city,
      state,
      zipcode,
      billStreetAddress,
      billCity,
      billState,
      billZipcode,
      wishlist
    } = this.state;
    this.props.updateUser(
      id,
      username,
      email,
      password,
      firstName,
      lastName,
      streetAddress,
      city,
      state,
      zipcode,
      billStreetAddress,
      billCity,
      billState,
      billZipcode,
      wishlist
    );
    this.setState({
      username: username,
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      streetAddress: streetAddress,
      city: city,
      state: state,
      zipcode: zipcode,
      billStreetAddress: billStreetAddress,
      billCity: billCity,
      billState: billState,
      billZipcode: billZipcode,
      wishlist: wishlist
    });
  }
  render() {
    console.log('PROPS ', this.props);
    return (
      <div className={'container'}>
        <h3>Update Your Information</h3>
        {
          <form method="post" onSubmit={this.handleSubmit}>
            <div className="form-group">
              {' '}
              <input
                name="username"
                className="form-control"
                type="text"
                value={this.state.username}
                onChange={this.handleChange}
                placeholder="Username"
                required
              />
            </div>

            <div className="form-group">
              {' '}
              <input
                name="email"
                className="form-control"
                type="text"
                value={this.state.email}
                onChange={this.handleChange}
                placeholder="Email"
                required
              />
            </div>

            <div className="form-group">
              {' '}
              <input
                type="password"
                name="password"
                type="text"
                className="form-control"
                value={this.state.password}
                onChange={this.handleChange}
                placeholder="Password"
                required
              />
            </div>

            <div className="form-group">
              {' '}
              <input
                name="firstName"
                className="form-control"
                type="text"
                value={this.state.firstName}
                onChange={this.handleChange}
                placeholder="First Name"
                required
              />
            </div>

            <div className="form-group">
              {' '}
              <input
                name="lastName"
                className="form-control"
                type="text"
                value={this.state.lastName}
                onChange={this.handleChange}
                placeholder="Last Name"
                required
              />
            </div>

            <div className="form-group">
              {' '}
              <input
                name="wishlist"
                className="form-control"
                type="text"
                value={this.state.wishlist}
                onChange={this.handleChange}
                placeholder="Wishlist"
              />
            </div>
            <br /><br />
            <h4>Shipping Address:</h4>
            <div className="form-group">
              {' '}
              <input
                name="streetAddress"
                className="form-control"
                type="text"
                value={this.state.streetAddress}
                onChange={this.handleChange}
                placeholder="Street Address"
                required
              />
            </div>

            <div className="form-group">
              {' '}
              <input
                name="city"
                className="form-control"
                type="text"
                value={this.state.city}
                onChange={this.handleChange}
                placeholder="City"
                required
              />
            </div>

            <div className="form-group">
              {' '}
              <input
                name="state"
                className="form-control"
                type="text"
                value={this.state.state}
                onChange={this.handleChange}
                placeholder="State"
                required
              />
            </div>

            <div className="form-group">
              {' '}
              <input
                name="zipcode"
                className="form-control"
                type="text"
                value={this.state.zipcode}
                onChange={this.handleChange}
                placeholder="ZipCode"
                required
              />
            </div>

            <br /><br />
            <h4>Billing Address:</h4>
            <div className="form-group">
              {' '}
              <input
                name="billStreetAddress"
                className="form-control"
                type="text"
                value={this.state.billStreetAddress}
                onChange={this.handleChange}
                placeholder="Street Address"
                required
              />
            </div>

            <div className="form-group">
              {' '}
              <input
                name="billCity"
                className="form-control"
                type="text"
                value={this.state.billCity}
                onChange={this.handleChange}
                placeholder="City"
                required
              />
            </div>

            <div className="form-group">
              {' '}
              <input
                name="billState"
                className="form-control"
                type="text"
                value={this.state.billState}
                onChange={this.handleChange}
                placeholder="State"
                required
              />
            </div>

            <div className="form-group">
              {' '}
              <input
                name="billZipcode"
                className="form-control"
                type="text"
                value={this.state.billZipcode}
                onChange={this.handleChange}
                placeholder="ZipCode"
                required
              />
            </div>
            <br />
            <button type="submit" className="btn btn-outline-primary">
              Update Information
            </button>
          </form>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = dispatch => {
  return {
    updateUser: (
      id,
      username,
      email,
      password,
      firstName,
      lastName,
      streetAddress,
      city,
      state,
      zipcode,
      billStreetAddress,
      billCity,
      billState,
      billZipcode,
      wishlist
    ) =>
      dispatch(
        updateUserThunk(
          id,
          username,
          email,
          password,
          firstName,
          lastName,
          streetAddress,
          city,
          state,
          zipcode,
          billStreetAddress,
          billCity,
          billState,
          billZipcode,
          wishlist
        )
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(_UpdateUserForm);
