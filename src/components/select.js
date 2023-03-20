import React from "react";

const Select = ({placeHolder, value, options, onChange}) => {

    if (Array.isArray(options) && options.length > 0) {
        return (
            <div className="">
                <select onChange={onChange} className="form-select form-select-md mr-3">
                    {options.map((item) => (
                        <option value={item.value} className="select-item"> {item.label}</option>
                    ))}
                </select>
            </div>
        );
    }
    else {
        return (<div className="">
            <select className="form-select form-select-md mr-3">
                <option className="select-item" >{placeHolder}</option>
            </select>
        </div>);
    }

};

export default Select;