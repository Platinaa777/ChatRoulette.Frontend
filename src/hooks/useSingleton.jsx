import { useEffect, useState } from "react"


export const useSingleton = () => {
    const [state, setState] = useState('')
    console.log('start use singl')
    const func = (message) => {
        setState(state + ":hello:world:" + message)
        
    }
    console.log(state)
    console.log('end use singl')

    return [state, func]
}