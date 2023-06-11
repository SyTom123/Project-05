import { get } from "../utils/request"

export const getQuestion = async (id ="")=> {
    let ids = "";
    if(id !== ""){
        ids = `?topicId=${id}`;
    }
    const result = await  get(`questions${ids}`);
    return result;
}