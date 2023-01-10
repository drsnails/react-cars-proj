const { useState, useEffect } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

import { carService } from "../services/car.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

export function CarEdit() {
    const [carToEdit, setCarToEdit] = useState(carService.getEmptyCar())
    const navigate = useNavigate()
    const { carId } = useParams()

    useEffect(() => {
        if (!carId) return
        loadCar()
    }, [])

    function loadCar() {
        carService.getById(carId)
            .then((car) => setCarToEdit(car))
            .catch((err) => {
                console.log('Had issues in car details', err)
                navigate('/car')
            })
    }

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setCarToEdit((prevCar) => ({ ...prevCar, [field]: value }))
    }

    function onSaveCar(ev) {
        ev.preventDefault()
        carService.save(carToEdit)
            .then((car) => {
                console.log('car saved', car);
                showSuccessMsg('Car saved!')
                navigate('/car')
            })
            .catch(err => {
                console.log('err', err)
                showErrorMsg('Cannot save car')
            })
    }

    return <section className="car-edit">
        <h2>{carToEdit.id ? 'Edit this car' : 'Add a new car'}</h2>

        <form onSubmit={onSaveCar}>
            <label htmlFor="vendor">Vendor : </label>
            <input type="text"
                name="vendor"
                id="vendor"
                placeholder="Enter vendor..."
                value={carToEdit.vendor}
                onChange={handleChange}
            />
            <label htmlFor="price">Price : </label>
            <input type="number"
                name="price"
                id="price"
                placeholder="Enter price"
                value={carToEdit.price}
                onChange={handleChange}
            />

            <div>
                <button>{carToEdit._id ? 'Save' : 'Add'}</button>
                <Link to="/car">Cancel</Link>
            </div>
        </form>
    </section>
}