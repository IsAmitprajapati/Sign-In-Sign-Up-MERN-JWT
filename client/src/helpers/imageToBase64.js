const imageToBase64 = async(file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)

    const data = new Promise((resolve,reject)=>{
        reader.onload = () => resolve(reader.result)

        reader.onerror = (error) => reject(error)
    })

    return data

}

export default imageToBase64