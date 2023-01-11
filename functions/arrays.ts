export function embaralhar(elementos: any[]): any[] {
  return elementos
    .map((elemento) => ({ elemento, aleatorio: Math.random() })) //return [obj]
    .sort((obj1, obj2) => obj1.aleatorio - obj2.aleatorio) //return asc order
    .map((obj) => obj.elemento); //transform {} in [elemento]
}
