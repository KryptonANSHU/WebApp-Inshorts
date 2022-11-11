import { createContext, useReducer, useEffect } from 'react';
import Cookies from 'js-cookie';

export const StoreContext = createContext();

const initialState = {
    user: Cookies.get('user') ? JSON.parse(Cookies.get('user')) : {},
    jwt: Cookies.get('jwt') || '',
    cart: [],
    addressID: Cookies.get('addressID') || '',
};

function reducer(state, action) {
    switch (action.type) {
        case 'SET_USER':
            console.log('Setting User', action.payload);
            return {
                ...state,
                user: action.payload,
            };
        case 'UNSET_USER':
            console.log('Removing User');
            return {
                ...state,
                user: null,
            };
        case 'SET_JWT':
            return {
                ...state,
                jwt: action.payload,
            };
        case 'UNSET_JWT':
            return {
                ...state,
                jwt: '',
            };
        default:
            return state;
    }
}

export const StoreProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <StoreContext.Provider value={{ state, dispatch }}>
            {props.children}
        </StoreContext.Provider>
    );
};
