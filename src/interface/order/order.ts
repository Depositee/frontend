export interface Order{
    id : string;
    depositor_id : string;
    depositee_id?: string;
    package_id : string;
    status : string;
    payment_type : string;
    payment_amount : string;
    package_name: string;
    package_description: string;
    package_weight : number;
}

export interface GetMyOrders{
    success : boolean;
    data : {
        data : Order[],
        message : string
    }
}