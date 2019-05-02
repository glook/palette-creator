# palette-creator

Simple palette generator inspired by [google material palette generator](https://material.io/inline-tools/color/).

## Demo

Do you want to see it in action? Visit [glook.github.io/palette-creator/](//glook.github.io/palette-creator/)

## Installation
use npm:

```
npm i palette-creator --save
```

or yarn:

```
yarn add palette-creator
```

## Usage
Just import palette generator:

#### es6
```
import PaletteGenerator from 'palette-creator';
```

#### or using require function
```
var PaletteGenerator = require('palette-creator');
```


## create palette

```
const palette = PaletteGenerator.getPalette('#F0EBF9');
```
Palette will contain object with colors grouped by shades. Every collor contains hex, hsl, rgb and contrast color.

```
50: {hsl: "hsl(259.5, 54.3%, 95%)", hex: "#F0EBF9", rgb: "rgb(240, 235, 249)", contrastColor: {…}, isPrimary: false, …}
100: {hsl: "hsl(259.5, 48.3%, 85%)", hex: "#D2C6EB", rgb: "rgb(210, 198, 235)", contrastColor: {…}, isPrimary: false, …}
200: {hsl: "hsl(259.5, 42.3%, 75%)", hex: "#B6A4DA", rgb: "rgb(182, 164, 218)", contrastColor: {…}, isPrimary: false, …}
300: {hsl: "hsl(259.5, 36.3%, 65%)", hex: "#9A85C6", rgb: "rgb(154, 133, 198)", contrastColor: {…}, isPrimary: false, …}
400: {hsl: "hsl(259.5, 30.3%, 55%)", hex: "#8069AF", rgb: "rgb(128, 106, 175)", contrastColor: {…}, isPrimary: false, …}
500: {hsl: "hsl(259.5, 24.3%, 45%)", hex: "#69578F", rgb: "rgb(105, 87, 143)", contrastColor: {…}, isPrimary: false, …}
600: {hsl: "hsl(259.5, 18.3%, 35%)", hex: "#54496A", rgb: "rgb(84, 73, 106)", contrastColor: {…}, isPrimary: true, …}
700: {hsl: "hsl(259.5, 12.3%, 25%)", hex: "#3D3848", rgb: "rgb(61, 56, 72)", contrastColor: {…}, isPrimary: false, …}
800: {hsl: "hsl(259.5, 6.3%, 20%)", hex: "#323036", rgb: "rgb(50, 48, 54)", contrastColor: {…}, isPrimary: false, …}
900: {hsl: "hsl(259.5, 0.3%, 15%)", hex: "#262626", rgb: "rgb(38, 38, 38)", contrastColor: {…}, isPrimary: false, …}
```

## getting similar colors 

```
const similarColors = PaletteGenerator.getSimilar('#F0EBF9');
```
Output will contain analogus, complimentary, triadic colors.

```
{
analogus: (2) [{…}, {…}]
complementary: {hsl: "hsl(19.5, 18.3%, 46.1%)", hex: "#8B6E60", rgb: "rgb(139, 110, 96)"}
primary: {hsl: "hsl(199.5, 18.3%, 46.1%)", hex: "#607D8B", rgb: "rgb(96, 125, 139)"}
triadic: (2) [{…}, {…}]
}
```
