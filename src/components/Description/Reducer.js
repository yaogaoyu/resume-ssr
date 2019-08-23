const descriptionReducer = (state = {}, action) => {
    console.log('descriptionReducer Reducer', state, action);
    let resultState = {};
    switch (action.type) {
        case 'init-data':
            resultState = {
                ...action.result,
            };
            break;
        default:
            resultState = {};
    }
    return resultState;
};

export default descriptionReducer;
