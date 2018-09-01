/** ./src/history/history.js
 * Parent user borrow hstory component.
 * It can be accessed via the  history link in the main navbar dropdown menu.
 */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {
  Nav, NavItem, NavLink, TabContent, TabPane,
} from 'reactstrap';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import send, { sessionExpire } from '../Helpers';
import BorrowHistory from './history-borrow';
import './history.css';

/** Main user borrow history component.
 * All api fetches called from this component.
*/
class Home extends Component {
  state = { borrow_details: [], activeTab: 'unreturned' }

  componentDidMount = () => {
    const { history } = this.props;
    send({}, 'GET', '/api/v1/users/books')
      .then(response => (response.json()))
      .then((data) => {
        this.setState({ borrow_details: data });
        // console.log('home>> ', data);
      })
      .catch(() => {
        sessionExpire(history);
      });
  }

  /** Update borrowed book component based on returned book.
   * @param {object} data
  */
  updateStateOnReturn = (data) => {
    const { borrow_details } = this.state;
    // Get index of returned book in this.state.borrow_details and update the element at said index.
    let returned_book = borrow_details.filter(detail => detail.borrow_id === data.borrow_id)[0];
    returned_book = Object.assign(returned_book,
      { return_date: data.return_date, fee_owed: data.fee_owed, status: data.status });
    const index_returned = borrow_details.indexOf(returned_book);
    borrow_details[index_returned] = returned_book;
    this.setState({ borrow_details });
  }

  /** Toggle between returned and unreturned book tabs.
   * @param {string} tab
  */
  toggle = (tab) => {
    let { activeTab } = this.state;
    activeTab = activeTab !== tab ? tab : activeTab;
    this.setState({ activeTab });
  }

  render() {
    const { borrow_details, activeTab } = this.state;

    return (
      <div className="container body-sec">
        <h3 className="library-table">Borrowed Books:</h3>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === 'unreturned' })}
              onClick={() => { this.toggle('unreturned'); }}
            >
              unreturned
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === 'returned' })}
              onClick={() => { this.toggle('returned'); }}
            >
              returned
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="unreturned">
            <BorrowHistory
              borrow_details={borrow_details.filter(borrow => borrow.status !== 'returned')}
              updateStateOnReturn={this.updateStateOnReturn}
            />
          </TabPane>
          <TabPane tabId="returned">
            <BorrowHistory
              borrow_details={borrow_details.filter(borrow => borrow.status === 'returned')}
              updateStateOnReturn={this.updateStateOnReturn}
            />
          </TabPane>
        </TabContent>
      </div>
    );
  }
}

Home.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default withRouter(Home);
