import React, { useEffect, useRef, useState, useMemo, memo, useCallback, forwardRef, useImperativeHandle } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeContext } from '../context/themeContext';

/**
 * Toggle dark mode
 * const { toggleTheme } = useThemeContext();
 * @returns {{toggleTheme: ((function(): void)|*)}}
 */
export default () => {
  const { _toggleTheme } = React.useContext(ThemeContext);

  const toggleTheme = useCallback(() => {
    console.log('useThemeContext.js _toggleTheme=', _toggleTheme);

    _toggleTheme();
  }, [_toggleTheme]);

  return { toggleTheme };
};
