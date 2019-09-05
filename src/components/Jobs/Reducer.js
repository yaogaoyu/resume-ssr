const reducer = (state, action) => {
    let resultState = state || {};
    switch (action.type) {
        case 'init-data':
            resultState = {
                ...action.data,
            };
            break;
        default:
            // resultState = {};
    }
    return resultState;
};

export default reducer;
