import { useState, useRef, useEffect, useCallback } from "react"

export const useStateWithCallback = initialState => {
    const [state, setState] = useState(initialState)
    const cbRef = useRef(null)

    const updateState = useCallback((newState, callback) => {
        cbRef.current = callback;
        
        setState(prev => typeof(newState) === 'function' ? newState(prev) : newState)
    })

    useEffect(() => {
        if (cbRef.current) {
            cbRef.current(state)
            cbRef.current = null
        }
    }, [state])

    return [state, updateState]
}