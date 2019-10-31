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
      shippingAddress: '',
      billingAddress: '',
      wishlist: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount(props) {
    const user = (await axios.get(`api/users/${this.props.match}`)).data;
    console.log("USER ", user)
    this.setState({
      id: user[0].id,
      username: user[0].username,
      email: user[0].email,
      password: user[0].password,
      firstName: user[0].firstName,
      lastName: user[0].lastName,
      shippingAddress: user[0].shippingAddress,
      billingAddress: user[0].billingAddress,
      wishlist: user[0].wishlist
    })
  }
  handleChange(ev) {
    console.log
    this.setState({ [ev.target.name]: ev.target.value })
  }
  handleSubmit(ev) {
    ev.preventDefault();
    const id = this.props.match
    const { username, email, password, firstName, lastName, shippingAddress, billingAddress, wishlist } = this.state;
    this.props.updateUser(id, username, email, password, firstName, lastName, shippingAddress, billingAddress, wishlist);
    this.setState({
      username: username,
      email: email,
      password: password,
      firstName: firstName,
      lastName: lastName,
      shippingAddress: shippingAddress,
      billingAddress: billingAddress,
      wishlist: wishlist
    })
  }
  render() {
    console.log("PROPS ", this.props)
    return (
      <div className={"container"}>
        <h3>Update Your Information</h3>
        {
          <form method="post" onSubmit={this.handleSubmit} >

            <div className="form-group"> <input name="username" className="form-control" type="text" value={this.state.username} onChange={this.handleChange} placeholder="Username" required /></div>

            <div className="form-group"> <input name="email" className="form-control" type="text" value={this.state.email} onChange={this.handleChange} placeholder="Email" required /></div>

            <div className="form-group"> <input type="password" name="password" type="text" className="form-control" value={this.state.password} onChange={this.handleChange} placeholder="Password" required /></div>

            <div className="form-group"> <input name="firstName" className="form-control" type="text" value={this.state.firstName} onChange={this.handleChange} placeholder="First Name" required /></div>

            <div className="form-group"> <input name="lastName" className="form-control" type="text" value={this.state.lastName} onChange={this.handleChange} placeholder="Last Name" required /></div>

            <div className="form-group">  <input name="shippingAddress" className="form-control" type="text" value={this.state.shippingAddress} onChange={this.handleChange} placeholder="Shipping Address" required /></div>

            <div className="form-group"> <input name="billingAddress" className="form-control" type="text" value={this.state.billingAddress} onChange={this.handleChange} placeholder="Billing Address" required /></div>

            <div className="form-group"> <input name="wishlist" className="form-control" type="text" value={this.state.wishlist} onChange={this.handleChange} placeholder="Wishlist" /></div>

            <button>Update Information</button>
          </form>

        }
      </div >
    )
  }
}

// const UpdateUserForm = connect(({ users }) => {
//   return {
//     users
//   }
// })(_UpdateUserForm)



// export default UpdateUserForm;

const mapStateToProps = (state) => ({
  users: state.users
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (id, username, email, password, firstName, lastName, shippingAddress, billingAddress, wishlist) => dispatch(updateUserThunk(id, username, email, password, firstName, lastName, shippingAddress, billingAddress, wishlist))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(_UpdateUserForm)
