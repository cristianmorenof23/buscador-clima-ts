export const formatTemperatura = (temperatura : number) : number => {
  const kelvin = 273.15
  return parseInt((temperatura - kelvin).toString())
}