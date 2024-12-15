import { v4 as uuidv4 } from 'uuid';
export const userData = [
    {
        id: uuidv4(),
        name: 'Astha Upadhyay',
        phoneno: '8888888888',
        email: `astha${uuidv4()}@gmail.com`,
        isAdmin: true,
        password: 'Test@12345'
    },
    {
        id: uuidv4(),
        name: 'Astha U',
        phoneno: '8888888889',
        email: `astha${uuidv4()}@gmail.com`,
        isAdmin: false,
        password: 'Test@45678'
    }
]