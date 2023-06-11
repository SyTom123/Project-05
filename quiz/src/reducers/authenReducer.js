const AuthenReducer = (state = false, action)=> {
    if(action.type === "CHANGE_AUTHEN"){
        return !state;
    }
    else {
        return state;
    }
    
}
export default AuthenReducer;