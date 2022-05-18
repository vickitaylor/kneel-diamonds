import { getDatabase } from "./database.js"


const database = getDatabase()

export const getStyles = () => {
    return database.styles.map(style => ({...style}))
}
export const getSizes = () => {
    return database.sizes.map(size => ({...size}))
}
export const getMetals = () => {
    return database.metals.map(metal => ({...metal}))
}
export const getOrders = () => {
    return database.customOrders.map(order => ({...order}))
}
export const getTypes = () => { 
    return database.types.map(type => ({...type}))
}

// functions to temporally store the order customer built 
export const setMetal = (id) => {
    database.orderBuilder.metalId = id
}
export const setSize = (id) => { 
    database.orderBuilder.sizeId = id
}
export const setStyle = (id) => {
    database.orderBuilder.styleId = id
}
export const setType = (id) => { 
    database.orderBuilder.typeId = id
}

// function that will take the "temp order" from order builder and push that order to the custom order array in the database 

export const addCustomOrder = () => {
    // Copy the current state of user choices
    const newOrder = {...database.orderBuilder}

    // Add a new primary key to the object
    const lastIndex = database.customOrders.length - 1
    newOrder.id = database.customOrders[lastIndex].id + 1

    // Add a timestamp to the order
    newOrder.timestamp = Date.now()

    // Add the new order object to custom orders state
    database.customOrders.push(newOrder)

    // Reset the temporary state for user choices
    database.orderBuilder = {}

    // Broadcast a notification that permanent state has changed
    document.dispatchEvent(new CustomEvent("stateChanged"))
}