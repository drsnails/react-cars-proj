
import { useEffect, useRef, useState } from "react"
import { useEffectUpdate } from "../customHooks/useEffectUpdate.js"
import { useForm } from "../customHooks/useForm.js"
import { carService } from "../services/car.service.js"
import { utilService } from "../services/util.service.js"


export function CarFilter({ onSetFilter, filterBy }) {

    // const [filterByToEdit, setFilterByToEdit] = useState(carService.getDefaultFilter())
    const [filterByToEdit, setFilterByToEdit, handleChange] = useForm(filterBy)

    onSetFilter = useRef(utilService.debounce(onSetFilter))

    const elInputRef = useRef(null)

    useEffect(() => {
        elInputRef.current.focus()
    }, [])

    useEffectUpdate(() => {
        // update father cmp that filters change very type
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])


    function onSubmitFilter(ev) {
        // update father cmp that filters change on submit
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }


    return <section className="car-filter full main-layout">
        <h2>Cars Filter</h2>
        <form onSubmit={onSubmitFilter}>
            <label htmlFor="vendor">Vendor:</label>
            <input type="text"
                id="vendor"
                name="txt"
                placeholder="By vendor"
                value={filterByToEdit.txt}
                onChange={handleChange}
                ref={elInputRef}
            />

            <label htmlFor="maxPrice">Max price:</label>
            <input type="number"
                id="maxPrice"
                name="maxPrice"
                placeholder="By max price"
                value={filterByToEdit.maxPrice}
                onChange={handleChange}
            />

            <button hidden>Filter</button>
        </form>

    </section>
}