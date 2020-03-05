import React from 'react'

export const CheckBox = props => {
    return (
      <div className="form-check">
        <label className="form-check-label" htmlFor={props.id}>
        <input className="form-check-input" onChange={props.handleCheckChieldElement} type="checkbox" checked={props.isChecked} value={props.value} /> 
        {props.name}
        </label>
      </div>
    )
}

export default CheckBox