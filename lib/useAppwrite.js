import { useState, useEffect } from "react"
import { Alert } from "react-native"

const useAppwrite = (fn) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchData = async() => {
        
        setIsLoading(true);
        try {
            const response = await fn();
            setData(response);
        } catch (error) {
            console.log("fetdata has an error:", error);
            Alert.alert("Error", error.message)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchData();     
    }, [])

    const refech = () => fetchData(); 

    return { data, isLoading, refech };
}

export default useAppwrite;