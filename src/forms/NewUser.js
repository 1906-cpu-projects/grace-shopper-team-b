import React, { Component, Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { addNewUser } from '../redux/thunks';
import PropTypes from 'prop-types';

const _NewUser = ({ addNewUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: ''
  });

  const { email, password, password2 } = formData;

  const onChange = ev =>
    setFormData({ ...formData, [ev.target.name]: ev.target.value });

  const onSubmit = async ev => {
    ev.preventDefault();
    if (password !== password2) {
      console.log('Passwords do not match');
    } else {
      addNewUser({ email, password });
    }
  };

  return (
    <div className="container">
      <Fragment>
        <form className="form-group" onSubmit={ev => onSubmit(ev)}>
          <h3>Sign Up Today!</h3>

          <div className="form-group">
            <input
              name="email"
              placeholder="Enter Email"
              value={email}
              onChange={ev => onChange(ev)}
              required
            />
          </div>
          <div className="form-group">
            <input
              name="password"
              placeholder="Enter Password"
              value={password}
              onChange={ev => onChange(ev)}
              required
            />
          </div>

          <div className="form-group">
            <input
              name="password2"
              placeholder="Please Re-enter Password"
              value={password2}
              onChange={ev => onChange(ev)}
              required
            />
          </div>

          <input type="submit" className="btn btn-primary" value="Sign Up!" />
        </form>
      </Fragment>
    </div>
  );
};

// class _NewUser extends Component {
//   constructor() {
//     super();
//     this.state = {
//       email: '',
//       password: '',
//       emailError: '',
//       passwordError: ''
//     };
//     this.onChange = this.onChange.bind(this);
//     this.addNewUser = this.addNewUser.bind(this);
//   }

//   onChange(ev) {
//     this.setState({ [ev.target.name]: ev.target.value });
//   }

//   // addNewUser(ev) {
//   //   ev.preventDefault();
//   //   const credentials = { ...this.state };
//   //   delete credentials.error;
//   //   this.props
//   //     .addNewUser(credentials)
//   //     .catch(ex => this.setState({ error: 'Email or password not valid.' }));
//   // }

//   render() {
//     const { users, onCloseClick } = this.props || {};
//     const addNewUser = this;
//     return (
//       <div className="modalBody">
//         <button onClick={onCloseClick} className="modalCloseButton">
//           x
//         </button>

//         <div className="modal">
//           <h3>Sign Up Today!</h3>

//           <label>Email</label>
//           <input
//             name="email"
//             placeholder="Enter Email"
//             value={users.email}
//             onChange={ev => this.onChange(ev, 'email')}
//           />
//           <div>{this.state.emailError}</div>

//           <label>Password</label>
//           <input
//             name="password"
//             placeholder="Enter Password"
//             value={users.password}
//             onChange={ev => this.onChange(ev, 'password')}
//           />
//           <div>{this.state.passwordError}</div>

//           <button onClick={() => this.props.addUser(this.state)}>Save</button>
//         </div>
//       </div>
//     );
//   }
// }

// _NewUser.defaultProps = {
//   onCloseClick: () => {}
// };

// const mapStateToProps = ({ users }) => ({ users });

// const mapDispatchToProps = dispatch => {
//   return {
//     addUser: user => {
//       dispatch(addNewUser(user));
//     }
//   };
// };

// const NewUser = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(_NewUser);

_NewUser.proptTypes = {
  addNewUser: PropTypes.func.isRequired
};

const NewUser = connect(
  null,
  (dispatch, { history }) => {
    return {
      addNewUser: newUser => dispatch(addNewUser(newUser, history))
    };
  }
)(_NewUser);

export default NewUser;
