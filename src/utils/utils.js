
const  utils =  {
    hashCode: (string) => {
        let hash = 0;
        for (let i = 0; i < string.length; i++) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }
        return hash;
    },

    intToRGB: (hashcode) => {
        let c = (hashcode & 0x00FFFFFF)
            .toString(16)
            .toUpperCase();

        return "00000".substring(0, 6 - c.length) + c;
    }
}

export default utils