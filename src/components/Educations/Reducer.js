const reducer = (state, action) => {
    let resultState = state || [];
    switch (action.type) {
        case 'edu-init-data':
            resultState = action.data || [];
            break;
        default:
    }
    return resultState;
};

export default reducer;
