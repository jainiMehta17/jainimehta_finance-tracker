import React, {Component} from "react";
class Welcome extends Component{

    render(){
        const {name} = this.props;
        return(
            <p>Welxcome {this.props.name}</p>
        )
    }
}
export default Welcome;