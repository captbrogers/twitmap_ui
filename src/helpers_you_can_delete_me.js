const { createStore, applyMiddleware, bindActionCreators } = Redux;
const { Provider, connect } = ReactRedux;
const ReduxThunk = ReduxThunk.default;

class App extends React.Component {
  componentDidMount = () => {
    this.props.fetchUsers();
  }

  handleChange = (event) => {
    this.props.selectUser(event.target.value);
  }

  render() {
    const userList = this.props.userList;
    const user = this.props.currentUser;

    if (this.props.loading) {
      return (
        <div>Loading...</div>
      )
    } else if (this.props.error) {
      return (
        <div>{this.props.error.message}</div>
      )
    }

    return (
      <div>
        <Select onChange={this.handleChange} userList={this.props.userList} />
        <CurrentUser currentUser={this.props.currentUser} />
      </div>
    );
  }
}

const Select = (props) => {
  renderOptions = () => (
    props.userList.map(user =>
      <option value={user.id} key={`user-${user.id}`}>{user.name}</option>
    )
  )

  return (
    <select onChange={props.onChange} defaultValue="">
      <option value="">Select an avatar</option>
      {this.renderOptions()}
    </select>
  );
}

const CurrentUser = (props) => {
  return (
    <div>
      <p>{props.currentUser && JSON.stringify(props.currentUser)}</p>
    </div>
  )
}

/* --- REDUCERS --- */
function reducer(state, action) {
  switch (action.type) {
    case "REQUEST_USERS":
      return {
        ...state,
        loading: action.loading,
        userList: []
      }
    case "REQUEST_USERS_SUCCESS":
      return {
        ...state,
        loading: action.loading,
        userList: action.userList
      }
    case "REQUEST_USERS_ERROR":
      return {
        ...state,
        loading: action.loading,
        error: action.error
      }
    case "SELECT_USER":
      return {
        ...state,
        currentUser: state.userList.find(user => user.id == action.currentUser)
      }
    default:
      return state
  }
};

/* --- ACTION CREATORS --- */
const actionCreators = {
  requestUsers: () => {
    return {
      type: "REQUEST_USERS",
      loading: true,
      error: null
    }
  },
  requestUsersSuccess: (userList) => {
    return {
      type: "REQUEST_USERS_SUCCESS",
      userList,
      loading: false,
      error: null
    }
  },
  requestUsersError: (error) => {
    return {
      type: "REQUEST_USERS_ERROR",
      loading: false,
      userList: [],
      error
    }
  },
  fetchUsers: () => {
    return function (dispatch) {
      dispatch(actionCreators.requestUsers());

      return fetch("https://jsonplaceholder.typicode.com/users")
      .then(
        response => {
          if (response.ok) {
            return response.json()
          }
          throw new Error("404");
        }
      )
      .then(json =>
        dispatch(actionCreators.requestUsersSuccess(json))
      ).catch(error => {
        console.error(error);
        dispatch(actionCreators.requestUsersError(error))
      })
    }
  },
  selectUser: (currentUser) => {
    return {
      type: "SELECT_USER",
      currentUser
    }
  }
};

/* --- STORE --- */
const preloadedState = {userList: [], currentUser: null};
const store = createStore(reducer, preloadedState, applyMiddleware(ReduxThunk));

/* --- CONNECT --- */
const AppContainer = connect(
  function mapStateToProps(state, props) {
        return {
      userList: state.userList,
            currentUser: state.currentUser,
      loading: state.loading,
      error: state.error
        };
    },
  function mapDispatchToProps(dispatch) {
        return bindActionCreators(actionCreators, dispatch);
    }
)(App);

/* --- RENDER THE APP --- */
ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById("app")
);
