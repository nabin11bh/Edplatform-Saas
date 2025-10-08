import axios from "axios"

interface IKhaltiData{
    return_url : string, 
    website_url : string, 
    amount : number, 
    purchase_order_id : string, 
    purchase_order_name : string
}

const KhaltiPayment = async(data:IKhaltiData)=>{
    const response = await axios.post("https://dev.khalti.com/api/v2/epayment/initiate/",{
        return_url : data.return_url, 
        website_url : data.website_url, 
        amount : data.amount * 100, 
        purchase_order_id : data.purchase_order_id, 
        purchase_order_name : data.purchase_order_name,  
    },{
        headers : {
            Authorization : "Key a5d37c45f3944a2a8b7c233586d72dc6"
        }
    })
    return response
}



export {KhaltiPayment}