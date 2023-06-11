import { del, get, post } from "../utils/request";
import {getCookie} from '../helpers/cookies'
export const createAnswer = async(options) => {
    const result = await post("answers", options);
    return result;
}
export const getAnswer = async() => {
    const id =getCookie("id");
    let userId = "";
    if(id !== ""){
        userId = `?userId=${id}`;
    }
    const result = await get(`answers${userId}`);
    return result;
}
export const getAnswerById = async(id) => {
    let ids = "";
    if(id !== ""){
        ids = `/${id}`;
    }
    const result = await get(`answers${ids}`);
    return result;
}
export const deleteAnswer = async(id) => {
    let ids = "";
    if(id !== ""){
        ids = `/${id}`;
    }
    const result = await del(`answers${ids}`);
    return result;
}