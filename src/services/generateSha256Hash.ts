import crypto from 'crypto'

const generateSha256Hash = (data:string,secretKey: string)=>{
    if(!data || !secretKey){
        throw new Error("Please provide data, secretKey")
    }
    const hash = crypto
    .createHmac("sha256",secretKey)
    .update(data)
    .digest("base64")
    return hash
}

export default generateSha256Hash