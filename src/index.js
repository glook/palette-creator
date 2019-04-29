/**
 * Created by: Andrey Polyakov (andrey@polyakov.im)
 */
import NearestColor from 'nearest-color';
import Color from 'color';
import materialPalette from './materialPalette';

export default class Index {
    static getPalette = (baseColor) => {
        const color_ = Index.__getColor(baseColor);
        const {name: nearestColorName} = Index.__getNearestColor(color_);
        if (nearestColorName) {
            const colorNumber = parseInt(nearestColorName, 10);
            const hsl = color_.hsl()
                .object();
            return Index.__paletteGenerator(hsl, colorNumber);
        }
        return {};
    };

    static getSimilar = (baseColor) => {
        const color = Index.__getColor(baseColor);
        return {
            primary: color.hsl()
                .string(),
            complementary: color.rotate(180)
                .hsl()
                .string(),
            analogus: [
                color.rotate(-30)
                    .hsl()
                    .string(),
                color.rotate(30)
                    .hsl()
                    .string(),
            ],
            triadic: [
                color.rotate(60)
                    .hsl()
                    .string(),
                color.rotate(120)
                    .hsl()
                    .string(),
            ],
        };
    };

    static __getColor = (color) => {
        try {
            return new Color(color);
        } catch (e) {
            throw new Error('[paletteGenerator]: Cannot parse input color');
        }
    };

    static __paletteGenerator = (color, shade) => {
        const result = {};
        const colorShades = Index.__getColorShades();
        const {s: colorSaturation} = color;
        const saturationRatio = Index.__getColorSaturationRatio(colorSaturation);
        const primaryColorShadeindex = colorShades.findIndex(({group}) => group === shade);
        if (Number.isInteger(primaryColorShadeindex) && saturationRatio) {
            colorShades.forEach(({group, ...colorModifiers}, shadeIndex) => {
                const {brightness} = colorModifiers;
                const isPrimary = group === shade;
                const indexDiff = shadeIndex - primaryColorShadeindex;
                let newColor = {...color};
                // dont appear saturation
                if (colorSaturation < 10) {
                    newColor = {
                        ...newColor,
                        l: brightness,
                    };
                } else {
                    const saturationValue = colorSaturation - (indexDiff * saturationRatio);
                    newColor = {
                        ...newColor,
                        l: brightness,
                        s: saturationValue <= 100 ? saturationValue : 100,
                    };
                }
                result[group] = Index.__getColorObject(newColor, group, isPrimary);
            });
        }
        return result;
    };

    static __getColorSaturationRatio = (colorSaturation) => {
        switch (true) {
            case colorSaturation <= 10:
                return 7;
            case colorSaturation <= 20:
                return 6;
            case colorSaturation <= 30:
                return 5;
            case colorSaturation <= 40:
                return 4.5;
            case colorSaturation <= 50:
                return 4;
            case colorSaturation <= 60:
                return 2;
            case colorSaturation <= 70:
                return 1.5;
            case colorSaturation <= 80:
                return 1;
            case colorSaturation <= 90:
                return -1;
            default:
                return -7;
        }
    };

    static __getColorShades = () => ([
        {
            group: 50,
            brightness: 95,
        },
        {
            group: 100,
            brightness: 85,
        },
        {
            group: 200,
            brightness: 75,
        },
        {
            group: 300,
            brightness: 65,
        },
        {
            group: 400,
            brightness: 55,
        },
        {
            group: 500,
            brightness: 45,
        },
        {
            group: 600,
            brightness: 35,
        },
        {
            group: 700,
            brightness: 25,
        },
        {
            group: 800,
            brightness: 20,
        },
        {
            group: 900,
            brightness: 15,
        },
    ]);

    static __getNearestColor(baseColor) {
        const hexColor = baseColor.hex();
        const palette = materialPalette;
        const mappedPalette = Object.entries(palette)
            .map((paletteItem) => {
                const [group, paletteData] = paletteItem;
                const nearestColorsFrom = NearestColor.from(paletteData);
                return {
                    ...nearestColorsFrom(hexColor),
                    group,
                };
            });
        return Index.__minBy(mappedPalette, 'distance');
    }

    static __minBy(array, attribute) {
        return array.reduce((min, p) => p[attribute] < min[attribute] ? p : min, array[0]);
    }

    static __getColorObject(_color, group, isPrimary = false) {
        const color = new Color(_color);
        return {
            hsl: color.hsl()
                .string(),
            hex: color.hex(),
            rgb: color.rgb()
                .string(),
            isPrimary,
            group,
        };
    }
}
