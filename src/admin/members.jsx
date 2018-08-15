import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Alert, Table, Tooltip, Button , Modal, ModalHeader, ModalBody} from 'reactstrap';
import send from '../Helpers';
import BaseTemplate from '../BaseTemplate.jsx';
import './admin.css';


class EditRoleForm extends Component {
  state = {
    user_details: {new_status:"", user:this.props.user},
    showAlert: false,
    error_message: "",
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log(this.state)
    send(this.state.user_details, 'POST', '/api/v1/auth/users/status_change')
    .then(response => {return response.json()})
    .then(data => {
      console.log(data)
      this.setState({
        showAlert: !this.state.showAlert,
        error_message: data.msg})
      }
    )
  }

  handleChange = (e) => {
    const role = e.target.value
    const user_details = Object.assign({}, this.state.user_details)
    user_details.new_status = e.target.value
    this.setState({user_details})
    // console.log(this.state)
  }

  render () {
    // console.log(this.props)
    return (

      <form className="container edit-role-form" onSubmit={this.handleSubmit}>
        <Alert isOpen={this.state.showAlert} color="warning">
          {this.state.error_message}
        </Alert>

        <select id="user-role" onChange={this.handleChange}>
          <option value="select_role" disabled>Select role</option>
          <option value="admin">admin</option>
          <option value="member">member</option>
          <option value="suspended">suspended</option>
          <option value="banned">banned</option>
        </select>
        <input type="submit" className="edit-role-btn"/>
      </form>
  )
  }
}

class MemberRow extends Component{
  state = {tooltipOpen: false, show: false}

  toggle =() => {
    this.setState({show: !this.state.show});
    }

  render() {
    return (
      <tr>
        <td value={this.props.value}>{this.props.value}</td>
        <td value={this.props.username}>{this.props.username}</td>
        <td value={this.props.email}>{this.props.email}</td>
        <td value={this.props.name}>{this.props.name}</td>
        <td value={this.props.acc_status}>{this.props.acc_status}</td>
        <td value="edit">
          <Button onClick= {this.toggle} className="signup-btn"><i className="fa fa-edit"/></Button>
        </td>

        <Modal isOpen={this.state.show} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Edit User Status:</ModalHeader>
          <ModalBody>
          <EditRoleForm user={this.props.username}/>
          </ModalBody>
        </Modal>
      </tr>
        )
    }
}

class MemberTable extends Component {

  render () {

    const members = this.props.members;

    return (
        <div className="container body-sec">
          <Table className="members-table">
            <thead>
              <tr>
                <th>#</th>
                <th>username</th>
                <th>email</th>
                <th>name</th>
                <th>acc_status</th>
                <th>actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => <MemberRow
                key={m.user_id}
                value={m.user_id}
                username={m.username}
                name={m.name}
                email={m.email}
                acc_status={m.acc_status}
                />)}
            </tbody>
          </Table>
        </div>
    )
  }
}

class MemberMain extends Component {
  state = {members:[]}

  componentDidMount = (e) => {
    send({}, 'GET', '/api/v1/auth/users')
    .then(response => {return response.json()})
    .then(data => {
      this.setState({members:data})
    //   console.log(this.state)
    })
  }

  render() {
    return (
      <div className="container">
        <BaseTemplate />
        <MemberTable members={this.state.members}/>
      </div>
      )
    }
  }

export default MemberMain;
