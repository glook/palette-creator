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
            primary: Index.__getColorObject(color
                .hex()),
            complementary:
                Index.__getColorObject(color.rotate(180)
                    .hex()),
            analogus: [
                Index.__getColorObject(color.rotate(-30)
                    .hex()),
                Index.__getColorObject(color.rotate(30)
                    .hex()),
            ],
            triadic: [
                Index.__getColorObject(color.rotate(60)
                    .hex()),
                Index.__getColorObject(color.rotate(120)
                    .hex()),
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
        const {s: colorSaturation, h: colorHue} = color;
        const colorShades = Index.__getColorShades(colorHue);
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

    static __getColorShades = (colorHue) => {
        if (colorHue <= 190 && colorHue >= 50) {
            return [
                {
                    group: 50,
                    brightness: 95,
                },
                {
                    group: 100,
                    brightness: 88,
                },
                {
                    group: 200,
                    brightness: 79,
                },
                {
                    group: 300,
                    brightness: 67,
                },
                {
                    group: 400,
                    brightness: 49,
                },
                {
                    group: 500,
                    brightness: 45,
                },
                {
                    group: 600,
                    brightness: 40,
                },
                {
                    group: 700,
                    brightness: 35,
                },
                {
                    group: 800,
                    brightness: 25,
                },
                {
                    group: 900,
                    brightness: 20,
                },
            ];
        }
        return [
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
        ];
    };

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

    static __getColorObject(_color, group = null, isPrimary = false) {
        const color = new Color(_color);

        const result = {
            hsl: color.hsl()
                .string(),
            hex: color.hex(),
            rgb: color.rgb()
                .string(),
        };
        if (group) {
            return {
                ...result,
                contrastColor: Index.__getContrastColor(_color),
                isPrimary,
                group,
            };
        }

        return result;
    }

    static __getContrastColor(_color) {
        const color = new Color(_color);
        const contrastColor = color.contrast(Color('#000')) > 4.5
            ? color.mix(Color('#000'), 0.8)
                .hex()
            : color.mix(Color('#fff'), 0.8)
                .hex();

        return Index.__getColorObject(contrastColor);
    }
}
