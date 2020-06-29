import React, {Component} from "react";
import {Button, Form} from "react-bootstrap";
import MdEditor from "for-editor";
import {mdEditorConfig} from "../../../../api/util/MdEditorConfig/MdEditorConfig";

class CreateForm extends Component{
    state={
        title:"",
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
                    <Form.Label>Card Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Title"
                        name={"title"}
                        value={this.state.title}
                        onChange={this.onValueChanged}
                        required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <MdEditor ref={this.$vm}
                              toolbar={mdEditorConfig}
                              language={"en"}
                              placeholder={"Give task description. (Markdown supported)"}
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

export default CreateForm;