export interface IBusqueda {
  ciudad: string
  pais: string
}

export interface IPais {
  code: string
  name: string
}

export interface Clima {
  name: string
  temp: number
  main: {
    temp_max: number
    temp_min: number
    humidity: number
  }
}