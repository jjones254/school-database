import React, {useState} from 'react';
import Cookies from 'js-cookie';
import axios from "axios";
import URL from "./config";

export const Context = React.createContext();

export const Provider = (props) => {
    
    const cookie = Cookies.get('authenticatedUser');

    const [authenticatedUser, setAuthenticatedUser] = useState(
        cookie ? JSON.parse(cookie) : null
    );

    const signIn = async (emailAddress, password) => {
        const user = await axios.get(`${URL}/api/users`, { auth: { username: emailAddress, password: password } });
        if (user !== null) {
            setAuthenticatedUser(user);
            Cookies.set('authenticatedUser', JSON.stringify(user), {expires:1});
        } else if (user === null){
            console.log('user not found');
        };
        return user;
    };

    const signOut = () => {
        setAuthenticatedUser(null);
        Cookies.remove('authenticatedUser');
    };

    return (
        <Context.Provider value={{
            authenticatedUser,
            actions: { signIn, signOut }
        }}>
            {props.children}
        </Context.Provider>
    );
    
};