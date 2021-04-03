import React from 'react';
import {DropdownButton,Dropdown} from 'react-bootstrap'

export default class Filter extends React.Component{
    render(){
        const {FilterAction=[]}=this.props;
        return(
            <DropdownButton id="dropdown-basic-button" title="Filter">
              {FilterAction.map(filter=> <Dropdown.Item onClick={filter.action}>{filter.name}</Dropdown.Item>)}
            </DropdownButton>
        )
    }
}