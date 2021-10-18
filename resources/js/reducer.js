import { encryptLocalStorage, decryptLocalStorage } from './frontComponents/helpers/hash';

const initState = {
    count: 0,
    user_check: false
}

const reducer = (state = initState, action) => {

    console.log(action);
    if (action.type == 'INCREASE') {
        console.log("ddddddd");
        return { count: state.count + 1 }
    } else if (action.type == 'DECREASE') {
        return { count: state.count - 1 }

    } else if (action.type == "USER") {
        console.log("a7777777777");

        if (!decryptLocalStorage('user')) {

            return { user_check: false }


        } else {

            return { user_check: true }

        }

    }
    return state;

}

export default reducer;