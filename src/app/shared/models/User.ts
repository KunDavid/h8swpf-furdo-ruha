export interface User {
    id: string;
    email: string;
    ordername: string;
    name: {
        firstname: string;
        lastname: string;
    }
    address: string;
}