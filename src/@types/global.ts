export type tileNamesType = "sky" | "ground" | "mario"

export type imageTilesType = {
  [key in tileNamesType]: {
    X: number
    Y: number
  }
}
