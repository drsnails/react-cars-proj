// const { useEffect } = React
// const { useSelector, useDispatch } = ReactRedux
// const { Link } = ReactRouterDOM
import { useDispatch, useSelector } from 'react-redux'
import { Link, useSearchParams } from 'react-router-dom'

import { CarList } from '../cmps/car-list.jsx'
import { CarFilter } from '../cmps/car-filter.jsx'
import { carService } from '../services/car.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadCars, removeCar, saveCar } from '../store/car.action.js'
import { ADD_TO_CART } from '../store/car.reducer.js'
import { useEffect } from 'react'
import { PopupMenu } from '../cmps/popup-menu.jsx'

export function CarIndex() {

    const cars = useSelector((storeState) => storeState.carModule.cars)
    const isLoading = useSelector((storeState) => storeState.carModule.isLoading)
    const shoppingCart = useSelector((storeState) => storeState.carModule.shoppingCart)
    const [searchParams, setSearchParams] = useSearchParams()
    const queryFilterBy = carService.getFilterFromSearchParams(searchParams)

    const dispatch = useDispatch()

    useEffect(() => {
        onLoadCars(queryFilterBy)
    }, [])

    function onLoadCars(filterBy) {
        loadCars(filterBy)
            .then(() => {
                // showSuccessMsg('Cars loaded')
            })
            .catch(err => {
                showErrorMsg('Cannot load cars')
            })
    }

    function onRemoveCar(carId) {
        removeCar(carId)
            .then(() => {
                showSuccessMsg('Car removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove car')
            })
    }

    function onAddCar() {
        const carToSave = carService.getRandomCar()
        saveCar(carToSave)
            .then((savedCar) => {
                showSuccessMsg(`Car added (id: ${savedCar._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot add car')
            })
    }

    function onEditCar(car) {
        const price = +prompt('New price?')
        const carToSave = { ...car, price }

        saveCar(carToSave)
            .then((savedCar) => {
                showSuccessMsg(`Car updated to price: $${savedCar.price}`)
            })
            .catch(err => {
                showErrorMsg('Cannot update car')
            })
    }

    function addToCart(car) {
        console.log(`Adding ${car.vendor} to Cart`)
        dispatch({ type: ADD_TO_CART, car })
        showSuccessMsg('Added to Cart')
    }

    function setFilter(filterBy) {
        setSearchParams(filterBy)
        onLoadCars(filterBy)
    }

    // function setFilter(filterBy) {
    //     setSearchParams(prevQueryParams=>{
    //         prevQueryParams = Object.fromEntries(prevQueryParams)
    //         return {...filterBy, ...prevQueryParams}
    //     })
    //     onLoadCars(filterBy)
    // }

    return <section>
        <h3>Cars App</h3>
        <main>
            {/* <PopupMenu top={<h2>Popup in Car Index</h2>}>
                <Text/>
                <Text/>
                <Text/>
            </PopupMenu> */}
            <Link to={`/car/edit`}>Add Car</Link>
            <button onClick={onAddCar}>Add random Car ⛐</button>

            <CarFilter filterBy={queryFilterBy} onSetFilter={setFilter} />
            {isLoading && <p>Loading...</p>}
            <CarList
                cars={cars}
                onRemoveCar={onRemoveCar}
                onEditCar={onEditCar}
                addToCart={addToCart}
                nums={[7, 8]}
                txt={'77'}
            />
            <hr />
            <pre>{JSON.stringify(shoppingCart, null, 2)}</pre>
        </main>
    </section>


}


const Text = () => {
    return <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur, eum!</span>
}