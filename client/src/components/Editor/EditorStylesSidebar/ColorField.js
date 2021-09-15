import React, {useState, useEffect} from 'react';

const ColorField = (props) => {

    const [value, setValue] = useState(props.value.value);

    useEffect(() => {
        setValue(props.value.value);
    }, [props.value.value]);



    const inputChangeHandler = (e) => {

        let val = e.target.value;
        setValue(val);
        props.updateStyle({property: props.id, value: val});
    }


    return (
        <input type="color"
               value={value}
               onChange={inputChangeHandler}
               id={props.id}
        />
    );
}

export default ColorField;