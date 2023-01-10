
export function CarPreview({ car }) {
    return (

        <article>
            <h4>{car.vendor}</h4>
            <h1>⛐</h1>
            <p>Price: <span>${car.price.toLocaleString()}</span></p>
            <p>Owner: <span>{car.owner && car.owner.fullname}</span></p>
            {/* <NavLink to={`/car/${car._id}`}>Details</NavLink> |
        <NavLink to={`/car/edit/${car._id}`}>Edit</NavLink> */}

        </article>
    )
}