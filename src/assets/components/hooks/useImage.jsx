import React, {useState, useEffect} from "react";
import image from "../../../../public/"
// this is a custom hook that was adopted and modified from 3rd party
export default function useImage({folderName, fileName}) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [image, setImage] = useState(null)

    const directory = folderName === null ?  
        `../../../../public/${fileName}` : 
        `../../../../public/${folderName}/${fileName}`

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const response = await import(directory)
                setImage(response.default)
            } catch (err) {
                setError(err)
            } finally {
                setLoading(false)
            }
        }

        fetchImage()
    }, [fileName])

    return {
        loading,
        error,
        image,
    }
}