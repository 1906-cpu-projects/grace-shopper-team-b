import React from 'react';
import { connect } from 'react-redux';
import UserUpdateForm from '../forms/UserUpdateForm';

const _User = ({ users, auth, match }) => {
  const _user = { ...users.find(_user => _user.id === match.params.id) }

  return (
    <div>
      <ul>
        <li className={'user'} key={_user.id}>
          <h3>User Info</h3>
          Name: {_user.firstName} {_user.lastName}
          <br />
          Username: {_user.username} <br />
          Email: {_user.email}
          <br />
          Password: {_user.password}
          <br />
          <br />
          <br />
          <h3>Shipping Address</h3>Street Address: {_user.streetAddress}{' '}
          <br />
          City: {_user.city} <br />
          State: {_user.state} <br />
          ZIP Code: {_user.zipcode} <br />
          <br />
          <br />
          <h3>Billing Address</h3>
          Street Address: {_user.billStreetAddress} <br />
          City: {_user.billCity} <br />
          State: {_user.billState} <br />
          ZIP Code: {_user.billZipcode} <br />
        </li>
      </ul>

      <UserUpdateForm match={match.params.id} auth={auth} />
    </div>
  );
};

// class User extends React.Component {
//   componentDidMount({ users, auth, match }) {
//     const _user = { ...users.find(_user => _user.id === match.params.id) }
//   }
//   render() {
//     return (
//       <div>
//         <ul>
//           <li className={'user'} key={_user.id}>
//             <h3>User Info</h3>
//             Name: {_user.firstName} {_user.lastName}
//             <br />
//             Username: {_user.username} <br />
//             Email: {_user.email}
//             <br />
//             Password: {_user.password}
//             <br />
//             <br />
//             <br />
//             <h3>Shipping Address</h3>Street Address: {_user.streetAddress}{' '}
//             <br />
//             City: {_user.city} <br />
//             State: {_user.state} <br />
//             ZIP Code: {_user.zipcode} <br />
//             <br />
//             <br />
//             <h3>Billing Address</h3>
//             Street Address: {_user.billStreetAddress} <br />
//             City: {_user.billCity} <br />
//             State: {_user.billState} <br />
//             ZIP Code: {_user.billZipcode} <br />
//           </li>
//         </ul>

//         <UserUpdateForm match={match.params.id} auth={auth} />
//       </div>
//     );
//   }
// };

const mapStateToProps = state => ({ users: state.users, auth: state.auth });
export default connect(mapStateToProps)(_User);

// const User = connect(({ users, auth }) => {
//   return {
//     users,
//     auth
//   };
// })(_User);

// export default User;
