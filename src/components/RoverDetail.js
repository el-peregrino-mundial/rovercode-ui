import React, { Component, Fragment } from 'react';
import {
  Accordion,
  Form,
  Grid,
  Header,
  Icon,
  Loader,
  Message,
  Segment,
  TextArea,
} from 'semantic-ui-react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';

import Credential from './Credential';

class RoverDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      config: {},
      accordionActive: false,
      configError: false,
      saveError: false,
      saveSuccess: false,
    };
  }

  componentDidMount() {
    const { fetchRover, id } = this.props;

    return fetchRover(id).then(data => this.setState({
      name: data.value.name,
      config: data.value.config,
    }));
  }

  saveRoverSuccess = () => {
    const { fetchRover, id } = this.props;

    this.setState({
      saveSuccess: true,
    });

    fetchRover(id);
  }

  saveRover = () => {
    const { editRover, id } = this.props;
    const { config, configError, name } = this.state;

    if (configError) {
      this.setState({
        saveError: true,
        saveSuccess: false,
      });
      return null;
    }

    this.setState({
      saveError: false,
      saveSuccess: false,
    });

    return editRover(id, {
      name,
      config,
    }).then(this.saveRoverSuccess);
  }

  handleClick = () => {
    const { accordionActive } = this.state;

    this.setState({
      accordionActive: !accordionActive,
    });
  }

  handleConfigChange = (event) => {
    try {
      this.setState({
        config: JSON.parse(event.target.value),
        configError: null,
      });
    } catch (e) {
      this.setState({
        configError: true,
      });
    }
  }

  handleNameChange = (event) => {
    this.setState({
      name: event.target.value,
    });
  }

  render() {
    const { intl, location, rover } = this.props;
    const {
      accordionActive,
      configError,
      saveError,
      saveSuccess,
    } = this.state;

    const nameLabel = intl.formatMessage({
      id: 'app.rover_detail.name',
      description: 'Label for rover name entry',
      defaultMessage: 'Name:',
    });

    return (
      <Grid centered divided="vertically" columns={16}>
        <Grid.Row>
          <Header as="h1">
            <FormattedMessage
              id="app.rover_detail.header"
              description="Header for rover settings"
              defaultMessage="Rover Settings"
            />
          </Header>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column width={4}>
            {
              saveError ? (
                <Grid.Row>
                  <Message negative>
                    <Message.Header>
                      <FormattedMessage
                        id="app.rover_detail.error_config"
                        description="Error message for invalid configuration"
                        defaultMessage="Error found in configuration"
                      />
                    </Message.Header>
                    <p>
                      <FormattedMessage
                        id="app.rover_detail.fix"
                        description="Directs the user to fix the error before saving"
                        defaultMessage="Please fix the error before saving."
                      />
                    </p>
                  </Message>
                </Grid.Row>
              ) : (null)
            }
            {
              saveSuccess ? (
                <Grid.Row>
                  <Message positive>
                    <FormattedMessage
                      id="app.rover_detail.saved"
                      description="Notifies the user that the configuration was saved"
                      defaultMessage="Rover configuration saved"
                    />
                  </Message>
                </Grid.Row>
              ) : (null)
            }
            {
              rover && location && location.state && location.state.created ? (
                <Grid.Row>
                  <Message icon info>
                    <Icon name="arrow down" />
                    <FormattedMessage
                      id="app.rover_detail.created"
                      description="Notifies the user that the rover has been created"
                      defaultMessage="Rover '{name}' has been created. Click the button below to download the credentials."
                      values={{
                        name: rover.name,
                      }}
                    />
                  </Message>
                </Grid.Row>
              ) : (null)
            }
            {
              rover === null ? (
                <Loader active />
              ) : (
                <Fragment>
                  <Grid.Row style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                    <Credential rover={rover} />
                  </Grid.Row>
                  <Grid.Row>
                    <Segment raised>
                      <Form key={rover.id} loading={!rover} onSubmit={this.saveRover}>
                        <Form.Input
                          inline
                          label={nameLabel}
                          defaultValue={rover.name}
                          onChange={this.handleNameChange}
                          required
                        />
                        <Form.Field error={configError}>
                          <Accordion>
                            <Accordion.Title active={accordionActive} onClick={this.handleClick}>
                              <Icon name="dropdown" />
                              <FormattedMessage
                                id="app.rover_detail.advanced"
                                description="Button label to access advanced settings"
                                defaultMessage="Advanced"
                              />
                            </Accordion.Title>
                            <Accordion.Content active={accordionActive}>
                              <TextArea
                                defaultValue={JSON.stringify(rover.config)}
                                onChange={this.handleConfigChange}
                              />
                            </Accordion.Content>
                          </Accordion>
                        </Form.Field>
                        <Form.Button primary>
                          <FormattedMessage
                            id="app.rover_detail.save"
                            description="Button label to save settings"
                            defaultMessage="Save"
                          />
                        </Form.Button>
                      </Form>
                    </Segment>
                  </Grid.Row>
                </Fragment>
              )
            }
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

RoverDetail.defaultProps = {
  location: null,
  rover: null,
};

RoverDetail.propTypes = {
  editRover: PropTypes.func.isRequired,
  fetchRover: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  location: PropTypes.shape({
    state: PropTypes.shape({
      created: PropTypes.bool.isRequired,
    }),
  }),
  rover: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    config: PropTypes.object.isRequired,
  }),
  intl: intlShape.isRequired,
};

export default injectIntl(RoverDetail);
