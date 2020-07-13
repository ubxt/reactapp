import React, { Component } from "react";
import axios from "axios";
const userContext = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "DELETE_USER":
      return {
        ...state,
        users: state.users.filter((user) => action.payload !== user.id),
      };
    case "ADD_USER":
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case "UPDATE_USER":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? action.payload : user
        ),
      };

    default:
      return state;
  }
};

export class UserProvider extends Component {
  state = {
    users: [],
    dispatch: (action) => {
      this.setState((state) => reducer(state, action));
    },
  };

  componentDidMount = async () => {
    await axios
      .get("http://localhost:3004/users")
      .then((response) => {
        this.setState({
          users: response.data,
        });
      })
      .catch((error) => console.log(error));
  };

  render() {
    return (
      <userContext.Provider value={this.state}>
        {this.props.children}
      </userContext.Provider>
    );
  }
}

const UserConsumer = userContext.Consumer;
export default UserConsumer;
