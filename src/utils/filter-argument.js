export const filter = {
    default: 'default',
    alphabet: 'alphabet',
    price: 'price',
}

Object.freeze(filter);
Object.seal(filter);


export const getFieldByFilter = (filterName) => {
    return ({
        [filter.alphabet]: 'title',
        [filter.price]: 'price',
    })[filterName];
}

