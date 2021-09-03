import { Fonts } from 'react-native-paper/src/types'

/**
 * import {  } from '~style';
 * note: Other files in the current directory cannot import {} from'~style',Will be undefined due to repeated references
 */
// import { useTheme } from '@react-navigation/native'

type Mode = 'adaptive' | 'exact';
export interface Theme {
    dark: boolean;
    mode?: Mode;
    roundness?: number;
    colors: {
        primary: string;
        background: string;
        surface: string;
        accent: string;
        error: string;
        text: string;
        onSurface: string;
        disabled: string;
        placeholder: string;
        backdrop: string;
        notification: string;
    };
    fonts?: Fonts;
    animation?: {
        scale: number;
    };
}

// export const _useTheme = useTheme
// export type _colors = Theme['colors']
