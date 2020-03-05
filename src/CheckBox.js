import React, { Component } from 'react'; //import React Component

export class CheckBox extends Component {
    render() {
        let onUpdate = this.props.onUpdate;
        let feature = this.props.options;

        let component = [];
        for (let i = 0; i < feature.length; i++) {
            component.push(
                <div className="form-check">
                    <label>
                        <input class="form-check-input" type="checkbox" name="category" value={this.props.value} checked={this.props.isChecked} onChange={(i) => onUpdate(i)}/>
                        {this.props.text}
                    </label>
                </div>
            )
        }

        console.log(component);
        
        return(
           {component} 
        );
    }
}