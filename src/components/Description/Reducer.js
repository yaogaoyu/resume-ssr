const descriptionReducer = (state, action) => {
    let resultState = {};
    switch (action.type) {
        case 'init-data':
            resultState = {
                ...action.data,
            };
            break;
        default:
            resultState = {};
    }
    return resultState;
};

export default descriptionReducer;
