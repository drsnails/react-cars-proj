import PropTypes from 'prop-types';
import { type } from "@testing-library/user-event/dist/type/index.js"
import { CarPreview } from "./car-preview.jsx"


export function CarList({ cars, onRemoveCar, onEditCar, addToCart, nums }) {
    return <ul className="car-list">
        {cars.map(car =>
            <li className="car-preview" key={car._id}>
                <CarPreview car={car} />

                <div>
                    <button onClick={() => { onRemoveCar(car._id) }}>x</button>
                    <button onClick={() => { onEditCar(car) }}>Change price</button>
                </div>

                <button className="buy" onClick={() => { addToCart(car) }}>
                    Add to Cart
                </button>
            </li>)}
    </ul>
}


CarList.propTypes = {
    txt(props, propName, cmp) {
        if (typeof props.txt !== 'string') {
            return new Error('Txt Not a String!')
        }
    },
    nums: PropTypes.array,
    // cars() {

    // }
}

const obg = {
    a:1,
    func() {

    },

}


// CarList.defaultProps = {
//     nums: [1, 2, 3 ,4]
// }