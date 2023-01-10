import { useEffect, useState } from "react";
import { PopupMenu } from "../cmps/popup-menu";
import { useEffectUpdate } from "../customHooks/useEffectUpdate";

export function AboutUs() {
    const [count, setCount] = useState(0)

    // useEffect(() => {
    //     if (!count) return
    //     document.title = count
    // }, [count])

    useEffectUpdate(() => {
        document.title = count
    }, [count])

    return (
        <>
            <section>
                <h2>About Us</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni aperiam quo veniam velit dolor reprehenderit, laudantium consequatur neque numquam labore quae. Accusamus libero perferendis ducimus? Alias unde hic quisquam doloremque.</p>
                <button onClick={() => setCount(count + 1)}>Increase</button>
            </section>
            {/* <PopupMenu top={<h2>Popup in ABout</h2>}>
                <span>Lorem ipsum dolor sit amet.</span>
                <span>Lorem ipsum dolor sit amet.</span>
                <span>Lorem ipsum dolor sit amet.</span>
            </PopupMenu> */}
        </>
    )

}
