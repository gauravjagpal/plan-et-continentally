import { useEffect, useRef, useState }  from 'react'

// This function is created and designed to hide the nav bar on a mobile view once something is clicked
const useClickOutsideToggle = () => {
    const [expanded, setExpanded] = useState(false);
    const ref = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setExpanded(false)
            }
        }

        document.addEventListener('mouseup', handleClickOutside)
        return () => {
            document.removeEventListener('mouseup', handleClickOutside)
        }
    }, [ref])
    return (
        {expanded, setExpanded, ref}
    )
}

export default useClickOutsideToggle