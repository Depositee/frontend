export interface Order{
    id : string;
    depositor_id : string;
    depositee_id?: string;
    package_id : string;
    status : string;
    payment_type : string;
    payment_amount : string;
    name: string;
    description: string;
}

export interface GetMyOrders{
    success : boolean;
    data : {
        data : Order[],
        message : string
    }
}