import { carService } from '../services/car.service.js'
import { store } from '../store/store.js'
import { REMOVE_CAR, SET_CARS, ADD_CAR, UPDATE_CAR, UNDO_REMOVE_CAR, SET_IS_LOADING } from '../store/car.reducer.js'

export function loadCars(filterBy) {
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    return carService.query(filterBy)
        .then((cars) => {
            store.dispatch({ type: SET_CARS, cars })
        })
        .catch(err => {
            console.log('Had issues loading cars', err)
            throw err
        })
        .finally(()=>{
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

// Example for Optimistic mutation:
export function removeCar(carId) {
    store.dispatch({ type: REMOVE_CAR, carId })
    return carService.remove(carId)
        .catch(err => {
            store.dispatch({ type: UNDO_REMOVE_CAR })
            console.log('Had issues Removing car', err)
            throw err
        })
}

export function removeCarNormal(carId) {
    return carService.remove(carId)
        .then(() => {
            store.dispatch({ type: REMOVE_CAR, carId })
        })
        .catch(err => {
            console.log('Had issues Removing car', err)
            throw err
        })
}

export function saveCar(car) {
    const type = (car._id) ? UPDATE_CAR : ADD_CAR
    return carService.save(car)
        .then(savedCar => {
            store.dispatch({ type, car: savedCar })
            return savedCar
        })
        .catch(err => {
            console.error('Cannot save car:', err)
            throw err
        })
}