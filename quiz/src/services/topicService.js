import {get} from '../utils/request'
export const getTopic = async (id = "") => {
    let ids = "";
    if(id !== ""){
        ids = `/${id}`;
    }
    const result = await get(`topics${ids}`);
    return result
}