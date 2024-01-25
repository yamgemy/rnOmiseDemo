export const addSlash = (text:string) => {
    const optionalSlash = text.length >= 3 ? "/" :'';
    console.log(optionalSlash)
    if (text.length === 3 && text.at(-1) !== '/') {
        console.log('Add', text)
        const lastChar = text.at(-1)
        return text.substring(0,2) + optionalSlash + lastChar
    }
    else{
        return text
    }
}

export const formatCardNumber = (text:string) => {
    const strippedInput = text.replace(/\s/g, '');

    // Insert a space after every 4 numbers using regular expressions
    const formattedInput = strippedInput.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    return formattedInput
}