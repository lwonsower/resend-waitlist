// Assorted helper functions

// Takes the string from the single input name and splits it into possible first and last name
const parseName = (name: string) => {
    const nameArr = name.split(' ');
    return nameArr.length > 1
        ? {
            first_name: nameArr[0],
            last_name: nameArr.length ?? nameArr.splice(0, 1).join(' '),
        } : { first_name: nameArr[0] };
}

// Sets color theme to passed variant, defaults to window settings if no variant is passed
const getTheme = (variant?: 'light' | 'dark') => variant || window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches ? 'dark' : 'light';

export {
    getTheme,
    parseName,
}
