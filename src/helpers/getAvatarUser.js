

export const getAvatarUser = (email) => {
    
    if (!email) return "";
    const array = email?.split("");
    const first = array[0].charCodeAt(0) - 65;
    return String(first)[0];
}
