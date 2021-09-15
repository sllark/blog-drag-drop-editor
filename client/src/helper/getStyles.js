
const getStyles = (styles)=>{

    let stylesObject={};

    Object.entries(styles).forEach(([key, value]) => {
        let isText = isNaN(Number(value.value));
        stylesObject[key] = value.value + (isText ? "" : value.unit);
    })

    return stylesObject;
}


export default getStyles;