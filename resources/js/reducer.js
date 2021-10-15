const initState = {
    count: 0
}

const reducer = (state = initState, action) => {

    console.log(action);
    if (action.type == 'INCREASE') {
        console.log("ddddddd");
        return { count: state.count + 1 }
    } else if (action.type == 'DECREASE') {
        return { count: state.count - 1 }

    }
    return state;

}

export default reducer;