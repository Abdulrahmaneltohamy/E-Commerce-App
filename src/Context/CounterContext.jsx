import { createContext, useState } from "react";


export let CounterContext = createContext()


export default function CounterContextProvider(props) {

    const [count, setCount] = useState(0)
    function changeCount() {
        setCount(Math.floor(Math.random()*100))
    }

    return <CounterContext.Provider value={{count , changeCount}}>

        {props.children}

    </CounterContext.Provider>
}