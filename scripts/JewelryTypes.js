import { getTypes, setType } from "./database.js"

// getting array from state to use in this module 
const types = getTypes()

// adding event listener to look for a change event for the jewelry type, when changed it will add the value to the temp object
document.addEventListener("change", (event) => {
        if (event.target.value) { 
            setType(parseInt(event.target.value))
        }
    })

export const jewelryType = () => { 
    let html = `<ul> 
        ${types.map(type => {
            return `<li>
                <input type="radio" name="type" value="${type.id}"/> ${type.name}
            </li>`
        }).join("")
    }
    </ul>`
    return html
}