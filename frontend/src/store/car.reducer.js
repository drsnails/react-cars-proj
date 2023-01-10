
export const SET_CARS = 'SET_CARS'
export const REMOVE_CAR = 'REMOVE_CAR'
export const UNDO_REMOVE_CAR = 'UNDO_REMOVE_CAR'
export const ADD_CAR = 'ADD_CAR'
export const UPDATE_CAR = 'UPDATE_CAR'
export const TOGGLE_CART_SHOWN = 'TOGGLE_CART_SHOWN'
export const ADD_TO_CART = 'ADD_TO_CART'
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART'
export const CLEAR_CART = 'CLEAR_CART'
export const SET_IS_LOADING = 'SET_IS_LOADING'




const initialState = {
    cars: [],
    lastRemovedCar: null,
    isLoading: false,
    isCartShown: false,
    shoppingCart: [],
}


export function carReducer(state = initialState, action) {
    let cars
    let shoppingCart
    let lastRemovedCar

    switch (action.type) {
        case SET_CARS:
            return { ...state, cars: action.cars }
        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

        case REMOVE_CAR:
            lastRemovedCar = state.cars.find(c => c._id === action.carId)
            cars = state.cars.filter(c => c._id !== action.carId)
            return { ...state, cars, lastRemovedCar }

        case UNDO_REMOVE_CAR:
            ({ lastRemovedCar } = state)
            cars = [lastRemovedCar, ...state.cars]
            return { ...state, cars, lastRemovedCar: null }

        case ADD_CAR:
            cars = [...state.cars, action.car]
            return { ...state, cars }
        case UPDATE_CAR:
            cars = state.cars.map(car => car._id === action.car._id ? action.car : car)
            return { ...state, cars }

        // Cart
        case TOGGLE_CART_SHOWN:
            return { ...state, isCartShown: !state.isCartShown }
        case ADD_TO_CART:
            shoppingCart = [...state.shoppingCart, action.car]
            return { ...state, shoppingCart }
        case REMOVE_FROM_CART:
            shoppingCart = state.shoppingCart.filter(c => c._id !== action.carId)
            return { ...state, shoppingCart }
        case CLEAR_CART:
            return { ...state, shoppingCart: [] }

        default:
            return state
    }
}


