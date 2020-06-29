import React, {Component} from "react";
import {Button, Form} from "react-bootstrap";
import MdEditor from "for-editor";
import getMdEditorConfig from "../../../../api/util/MdEditorConfig/MdEditorConfig";

class CreateWallForm extends Component{
    state={
        name:"",
        description:"",
    }

    $vm = React.createRef()

    onValueChanged = event => {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    render() {
        return (
            <Form onSubmit={event=>{
                event.preventDefault();
                this.props.onSubmit({
                    ...this.state
                })
            }}>
                <Form.Group>
                    <Form.Label>Project Wall Name</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Give a name to your project wall"
                        name={"name"}
                        value={this.state.name}
                        onChange={this.onValueChanged}
                        required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Wall Description</Form.Label>
                    <MdEditor ref={this.$vm}
                              toolbar={getMdEditorConfig()}
                              language={"en"}
                              placeholder={"Give description for this wall. (Markdown supported)"}
                              name={"description"}
                              value={this.state.description}
                              onChange={value=>this.setState({
                                  ...this.state,
                                  description: value
                              })}/>
                </Form.Group>
                <Form.Group style={{
                    float:"right"
                }}>
                    <Button variant={"secondary"} onClick={this.props.onCancel}>Cancel</Button>
                    &nbsp;
                    <Button type="submit">Create New</Button>
                </Form.Group>
            </Form>
        );
    }
}

export default CreateWallForm;