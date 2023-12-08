import axios, { AxiosResponse } from 'axios'

export async function addClient (email: any, password: any, confirmPassword: any, firstName: any, lastName: any, phone: any, birthdate: any): Promise <AxiosResponse<void>> {
  return await axios.post('http://localhost:8080/api/auth/SignUpClient', { email, password, confirmPassword, firstName, lastName, phone, birthdate }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export async function addShop (email: any, password: any, confirmPassword: any, name: any, location: any, phone: any, openingTime: any, closingTime: any): Promise <AxiosResponse<void>> {
  return await axios.post('http://localhost:8080/api/auth/SignUpShop', { email, password, confirmPassword, name, location, phone, openingTime, closingTime }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
