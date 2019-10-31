import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { FormattedMessage } from 'react-intl';
import {
  Card,
  Col,
  KeyValue,
  Layout,
  Row,
} from '@folio/stripes/components';
import { AppIcon, Pluggable } from '@folio/stripes/core';

import css from './UserField.css';

export default class UserField extends React.Component {
  static propTypes = {
    id: PropTypes.string,
    input: PropTypes.shape({
      onChange: PropTypes.func.isRequired,
      value: PropTypes.string,
    }).isRequired,
    meta: PropTypes.shape({
      error: PropTypes.node,
    }).isRequired,
    onUserSelected: PropTypes.func.isRequired,
    user: PropTypes.shape({
      label: PropTypes.string,
    }),
  }

  static defaultProps = {
    user: {},
  }

  renderLinkUserButton = value => (
    <Pluggable
      aria-haspopup="true"
      dataKey="user"
      data-test-ic-link-user
      disableRecordCreation
      id={`${this.props.id}-search-button`}
      marginBottom0
      marginTop0
      searchLabel={<FormattedMessage id={`stripes-erm-components.contacts.${value ? 'replace' : 'link'}User`} />}
      searchButtonStyle={value ? 'default' : 'primary'}
      selectUser={this.props.onUserSelected}
      type="find-user"
    >
      <FormattedMessage id="stripes-erm-components.contacts.noUserPlugin" />
    </Pluggable>
  )

  renderUser = () => {
    const {
      email = '-',
      firstName = '',
      lastName = '-',
      middleName = '',
      phone = '-',
    } = get(this.props.user, 'personal', {});

    const name = `${lastName}${firstName ? ', ' : ' '}${firstName} ${middleName}`;

    return (
      <div data-test-user-card>
        <Row>
          <Col xs={12} md={5}>
            <KeyValue label={<FormattedMessage id="stripes-erm-components.contacts.name" />}>
              <span data-test-user-name>
                {name}
              </span>
            </KeyValue>
          </Col>
          <Col xs={6} md={3}>
            <KeyValue label={<FormattedMessage id="stripes-erm-components.contacts.phone" />}>
              <span data-test-user-phone>
                {phone}
              </span>
            </KeyValue>
          </Col>
          <Col xs={6} md={4}>
            <KeyValue label={<FormattedMessage id="stripes-erm-components.contacts.email" />}>
              <span data-test-user-email>
                {email}
              </span>
            </KeyValue>
          </Col>
        </Row>
      </div>
    );
  }

  renderEmpty = () => (
    <div data-test-user-empty>
      <Layout className="textCentered">
        <strong>
          <FormattedMessage id="stripes-erm-components.contacts.noUserLinked" />
        </strong>
      </Layout>
      <Layout className="textCentered">
        <FormattedMessage id="stripes-erm-components.contacts.linkUserToStart" />
      </Layout>
    </div>
  )

  renderError = () => (
    <Layout className={`textCentered ${css.error}`} data-test-user-error>
      <strong>
        {this.props.meta.error}
      </strong>
    </Layout>
  )

  render() {
    const {
      id,
      input: { value },
      meta: { error, touched }
    } = this.props;

    return (
      <Card
        cardStyle={value ? 'positive' : 'negative'}
        hasMargin
        headerStart={(
          <AppIcon app="users" size="small">
            <strong>
              <FormattedMessage id="stripes-erm-components.contacts.user" />
            </strong>
          </AppIcon>
        )}
        headerEnd={this.renderLinkUserButton(value)}
        id={id}
        roundedBorder
      >
        { value ? this.renderUser() : this.renderEmpty() }
        { touched && error ? this.renderError() : null }
      </Card>
    );
  }
}