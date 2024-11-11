export interface UserData {
    id : string,
    username : string
    firstName? : string,
    lastName? : string
    phoneNumber? : string,
    roomNumber? : string,
    role? : number
}

export interface GetCurrentUserData{
    success : boolean,
    data : {
        valid : boolean,
        user : UserData
    }
}

export interface GetUserData{
    success : boolean,
    data : UserData
}