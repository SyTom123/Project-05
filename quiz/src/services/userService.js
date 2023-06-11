import { getCookie } from '../helpers/cookies';
import {get, post} from '../utils/request'
export const getUser = async (email = "", password = "")=> {
    let emails = "";
    if(email !== "") {
        emails = `email=${email}`;
    }
    let passwords = "";
    if(password !== "") {
        passwords = `&password=${password}`;
    }
    const result = await get(`users?${emails}${passwords}`);
    return result;
}
export const getUserByID = async () => {
    const id = getCookie("id");
    const result = await get(`users/${id}`);
    return result;
}
export const createUser = async (options) => {
    const result = await post (`users`,options);
    return result;
}