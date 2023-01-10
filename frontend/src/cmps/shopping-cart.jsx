import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { REMOVE_FROM_CART } from '../store/car.reducer.js'
import { checkout } from '../store/user.action.js'

export function ShoppingCart({ cart, dispatch }) {

    const user = userService.getLoggedinUser()
    
    function removeFromCart(carId) {
        console.log(`Todo: remove: ${carId} from cart`)
        // TODO: use dispatch
        dispatch({ type: REMOVE_FROM_CART, carId })
    }

    function getCartTotal() {
        return cart.reduce((acc, car) => acc + car.price, 0)
    }

    function onCheckout() {
        const amount = getCartTotal()
        checkout(-amount)
            .then(newScore => {
                showSuccessMsg(`Charged you: $ ${amount.toLocaleString()}`)
            })
    }

    const total = getCartTotal()
    return <section className="cart" >
        <h5>Your Cart</h5>

        <ul>
            {
                cart.map((car, idx) => <li key={idx}>
                    <button onClick={() => { removeFromCart(car._id) }}>x</button>
                    {car.vendor} | ${car.price}
                </li>)
            }
        </ul>

        <p>Total: ${total.toLocaleString()} </p>
        <button disabled={!user || !total} onClick={onCheckout}>Checkout</button>
    </section>

}
