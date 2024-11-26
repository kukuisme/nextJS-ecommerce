"use client"

import { useCartStore } from "@/store"
import { AddCartType } from "@/types/AddCartType"

export default function AddCart({
    name,
    id,
    image,
    unit_amount,
    quantity,
    }: AddCartType) {
        const cartStore = useCartStore()
        //const [added,setAdded]=useState(false)
        // const handleAddTocart=()=>{
        //     cartStore.addProduct({
        //         id,
        //         name,
        //         price,
        //         quantity,
        //         image,
        //     })
        //     setAdded(true)
        //     setTimeout(()=>{
        //         setAdded(false)
        //     },500)
        // ({id,image,unit_amount,quantity,name})} }
    return(
        <>
            <button 
            onClick={()=> 
                cartStore.addProduct({id,name,unit_amount,quantity,image})
            } 
            className="my-12 text-white py-2 px-6 font-medium rounded-md bg-teal-700">
                Add to cart
            </button>
        </>
    )
}