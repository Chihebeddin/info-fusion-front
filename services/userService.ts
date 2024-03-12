import axios, { type AxiosResponse } from 'axios'

export async function addClient (email: any, password: any, confirmPassword: any, firstName: any, lastName: any, phone: any, birthdate: any): Promise <AxiosResponse<void>> {
  return await axios.post('http://localhost:8080/api/auth/SignUpClient', { email, password, confirmPassword, firstName, lastName, phone, birthdate }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export async function addShop (
  name: string | Blob,
  location: string | Blob,
  phone: string | Blob,
  openingTime: string | Blob,
  closingTime: string | Blob,
  image: File | Blob,
  email: string | Blob,
  longitude: any,
  latitude: any,
  ShopType: any,
  password: string | Blob,
  confirmPassword: string | Blob
) {
  const formData = new FormData()
  formData.append('name', name)
  formData.append('location', location)
  formData.append('phone', phone)
  formData.append('openingTime', openingTime)
  formData.append('closingTime', closingTime)
  formData.append('image', image) // Make sure 'image' is being appended correctly

  formData.append('email', email)
  formData.append('longitude', longitude)
  formData.append('latitude', latitude)
  formData.append('ShopType', ShopType)
  formData.append('password', password)
  formData.append('confirmPassword', confirmPassword)

  try {
    const response = await axios.post('http://localhost:8080/api/auth/SignUpShop', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    return response
  } catch (error) {
    throw new Error('NNNNNNNNNNNNNNNNNNNN')
  }
}
