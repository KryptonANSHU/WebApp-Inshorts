import Cookies from 'js-cookie';
import axios from 'axios';
import notify from '../notify';
import Router from 'next/router';

export const logoutHandler = (dispatch) => {
    console.log('Loggin out');
    dispatch({ type: 'UNSET_USER' });
    Cookies.remove('user');
    dispatch({ type: 'UNSET_JWT' });
    Cookies.remove('jwt');
    Router.push('/signin');
};

export const loginWithEmail = async (dispatch, email, password) => {
    if (email.length === 0 || password.length === 0) {
        return notify('Please fill the login form', 'info');
    }

    try {
     
        const res = await axios
            .post(`http://localhost:5000/user/login`, {
                email,
                password,
            })
        var inThirtyMins = new Date(new Date().getTime() + 30 * 60 * 1000);
        console.log('res', res)
        dispatch({
            type: 'SET_USER',
            payload: res.data.user_instance,
            time: inThirtyMins,
        });

        Cookies.set('user', JSON.stringify(res.data.user_instance));

        dispatch({
            type: 'SET_JWT',
            payload: res.data.token,
            time: inThirtyMins,
        });

        Cookies.set('jwt', res.data.token);
        notify('Logged In', 'success');
        return true;
    } catch (err) {
        if (err?.response?.data?.message) {
            notify(err?.response?.data?.message, 'error');
        } else {
            notify(err.message, 'error');
        }
        return false;
    }
}

export const signupWithEmail = async (dispatch, email, password, confirmPassword) => {

    if (password !== confirmPassword) {
        console.log(password, confirmPassword);
        notify('Passwords do not match', 'error');
        return;
    }
    try {
        const res = await axios
            .post(`http://localhost:5000/user/signup`, {
                email,
                password,
            })
        var inThirtyMins = new Date(new Date().getTime() + 30 * 60 * 1000);
        console.log('res', res)
        dispatch({
            type: 'SET_USER',
            payload: res.data.user_instance,
            time: inThirtyMins,
        });

        Cookies.set('user', JSON.stringify(res.data.user_instance));

        dispatch({
            type: 'SET_JWT',
            payload: res.data.token,
            time: inThirtyMins,
        });

        Cookies.set('jwt', res.data.token);
        notify('Signed Up', 'success');
        return true;
    } catch (err) {
        if (err?.response?.data?.message) {
            notify(err?.response?.data?.message, 'error');
        } else {
            notify(err.message, 'error');
        }
        return false;
    }
}
