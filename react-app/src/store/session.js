// constants
const SET_USER = 'session/SET_USER';
export const REMOVE_USER = 'session/REMOVE_USER';



const setUser = (user) => ({
  type: SET_USER,
  payload: user
});

const removeUser = () => ({
  type: REMOVE_USER,
})



const initialState = { user: null };

export const authenticate = () => async (dispatch) => {
  const response = await fetch('/api/auth/', {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (response.ok) {
    const data = await response.json();
    if (data.errors) {
      return;
    }

    dispatch(setUser(data));
  }
}

export const login = (credential, password) => async (dispatch) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      credential,
      password
    })
  });


  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }

}

export const logout = () => async (dispatch) => {
  const response = await fetch('/api/auth/logout', {
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (response.ok) {
    dispatch(removeUser());
  }
};


export const signUp = (username, email, password, image, displayName) => async (dispatch) => {

    const formData = new FormData()

    formData.append('username', username)
    formData.append('display_name',displayName)
    formData.append('email', email)
    formData.append('password',password)
    if(image) formData.append("image", image)

    const response = await fetch('/api/auth/signup', {
    method: 'POST',
    body: formData
  });

  if (response.ok) {
    const data = await response.json();
    dispatch(setUser(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
        console.log('errors to react' ,data.errors)
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}

export const editUser = (user_id, display_name, image, tempImageUrl) => async (dispatch) => {
    const formData = new FormData()
    formData.append('display_name',display_name)
    formData.append('isImage', tempImageUrl)
    if(image) formData.append("image", image)
    const response = await fetch(`/api/users/${user_id}/edit`, {
        method: 'PUT',
        body: formData
    })

    if (response.ok) {
        const data = await response.json();
        dispatch(setUser(data))
        return null;
      } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            console.log('errors to react from edit' ,data.errors)
          return data.errors;
        }
      } else {
        return ['An error occurred. Please try again.']
      }
}

export const deleteUser = (user_id, password) => async (dispatch) => {
    console.log('just gotta send it to the server... no going back', user_id, password)
    let res = await fetch(`/api/users/${user_id}/delete`, {
        method : 'DELETE',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify({
            user_id,
            password,
        })
    })

    if (res.ok){
        dispatch(removeUser())
    }else{
        console.log(await(res.json()))
    }

}
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return { user: {...action.payload} }
    case REMOVE_USER:
      return { user: null }
    default:
      return state;
  }
}
