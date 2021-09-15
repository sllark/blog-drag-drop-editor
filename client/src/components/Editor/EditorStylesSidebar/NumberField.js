import React, {useState, useEffect} from 'react';

const NumberField = (props) => {

    const [value, setValue] = useState(props.value.value);
    const [unit, setUnit] = useState(props.value.unit);

    useEffect(() => {
        setValue(props.value.value);
        setUnit(props.value.unit);
    }, [props.value.value, props.value.unit]);


    const inputKeyDownHandler = (e) => {


        if (e.keyCode === 38 || e.keyCode === 40) {

            e.preventDefault();
            let inputValue = Number(value);

            if (e.keyCode === 38) {

                if (isNaN(inputValue) || inputValue < 0)
                    inputValue = 0;
                else
                    inputValue++;

            } else if (e.keyCode === 40) {

                if (isNaN(inputValue) || inputValue <= 0)
                    inputValue = 0;
                else
                    inputValue--;

            }


            // if (unit === "none")
            //     setUnit("px");

            setValue(inputValue);
            props.updateStyle({property: props.id, value: value, unit});

        }


    }

    const inputChangeHandler = (e) => {

        let val = e.target.value;
        let unitValue = unit;
        let isText = isNaN(Number(val));

        if (isText) unitValue = "none";
        // else if (unitValue === "none") unitValue = "px";


        setValue(val);
        setUnit(unitValue);
        props.updateStyle({property: props.id, value: val, unit: unitValue});
    }

    const unitChangeHandler = (e) => {
        let isText = isNaN(Number(value));
        let unitVal = e.target.value;

        setUnit(unitVal);
        props.updateStyle({property: props.id, value: value, unit: unitVal});
    }


    return (
        <div className="numberField">
            <input type="text"
                   value={value}
                   onChange={inputChangeHandler}
                   onKeyDown={inputKeyDownHandler}
                   id={props.id}
                   autoComplete="off"
            />
            <select
                name="numberFieldUnit"
                value={unit}
                onChange={unitChangeHandler}
            >
                <option value="px">px</option>
                <option value="%">%</option>
                <option value="vh">vh</option>
                <option value="vw">vw</option>
                <option value="none">none</option>
            </select>
        </div>
    );
}

export default NumberField;