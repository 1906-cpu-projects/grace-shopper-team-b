import React from 'react';
import { connect } from 'react-redux';
import store, { setUsersThunk, updateUserThunk } from '../store';
import axios from 'axios';


class _UpdateUserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      username: '',
      password: '',
      email: '',
      firstName: '',
      lastName: '',
      shippingAddress: '',
      billingAddress: '',
      wishList: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  async componentDidMount(props) {
    const user = (await axios.get(`api/users/${this.props.match}`)).data;
    //const user = store.dispatch(setUsersThunk());
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
      wishList: user[0].wishList
    })
  }
  handleChange(ev) {
    this.setState({ [ev.target.name]: ev.target.value })
  }
  handleSubmit(ev) {
    ev.preventDefault();
    const id = this.props.match
    const { username, password, email, firstName, lastName, shippingAddress, billingAddress, wishList } = this.state;
    //this.props.updateUserAll(id, username, password, email, firstName, lastName, shippingAddress, billingAddress, wishList);
    this.setState({
      id: '',
      username: '',
      password: '',
      email: '',
      firstName: '',
      lastName: '',
      shippingAddress: '',
      billingAddress: '',
      wishList: ''
    })
  }
  render() {
    console.log("PROPS ", this.props)
    return (
      <div className={"container"}>
        <h3>Update Your Information</h3>
        {
          <form method="post" onSubmit={this.handleSubmit} >
            <input name="username" type="text" value={this.state.username} onChange={this.handleChange} placeholder="Username" required /><br />
            <input name="email" type="text" value={this.state.email} onChange={this.handleChange} placeholder="Email" required /><br />
            <input type="password" name="password" type="text" value={this.state.password} onChange={this.handleChange} placeholder="Password" required /><br />
            <input name="firstName" type="text" value={this.state.firstName} onChange={this.handleChange} placeholder="First Name" required /><br />
            <input name="lastName" type="text" value={this.state.lastName} onChange={this.handleChange} placeholder="Last Name" required /><br />
            <input name="shippingAddress" type="text" value={this.state.shippingAddress} onChange={this.handleChange} placeholder="Shipping Address" required /><br />
            <input name="billingAddress" type="text" value={this.state.billingAddress} onChange={this.handleChange} placeholder="Billing Address" required /><br />
            <input name="wishList" type="text" value={this.state.wishList} onChange={this.handleChange} placeholder="Wish List" required /><br />
            <button>Update Information</button>
          </form>

        }
      </div >
    )
  }
}

const UpdateUserForm = connect(({ users }) => {
  return {
    users
  }
})(_UpdateUserForm)



export default UpdateUserForm;

// const mapDispatchToProps = (dispatch) => {
//   return {
//     updateUserAll: (id, username, email, password, chefScore, imageURL) => dispatch(updateUserThunk(id, username, email, password, chefScore, imageURL))
//   }
// }

// export default connect(mapStateToProps)(UpdateUserForm)
