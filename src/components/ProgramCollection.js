import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import {
  Button,
  Card,
  Dropdown,
  Grid,
  Header,
  Icon,
  Input,
} from 'semantic-ui-react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import CustomPagination from './CustomPagination';

class ProgramCollection extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      searchQuery: null,
      ordering: 'name',
    };
  }

  update = () => {
    const { onUpdate, owned } = this.props;
    const { page, ordering, searchQuery } = this.state;

    const params = {
      page,
      ordering,
    };

    if (searchQuery) {
      params.search = searchQuery;
    }

    onUpdate(params, owned);
  }

  toggleOrdering = (name) => {
    const { ordering } = this.state;

    if (ordering.endsWith(name)) {
      if (ordering.startsWith('-')) {
        return ordering.substr(1);
      }

      return `-${ordering}`;
    }

    return name;
  }

  handlePageChange = (e, { activePage }) => this.setState({
    page: activePage,
  }, () => this.update())

  handleSearchChange = event => this.setState({
    searchQuery: event.target.value,
    page: 1,
  }, () => this.update())

  handleOrderingChange = (e, { name }) => this.setState({
    ordering: this.toggleOrdering(name),
  }, () => this.update())

  render() {
    const {
      label,
      onProgramClick,
      onRemoveClick,
      programs,
      owned,
      intl,
    } = this.props;
    const { ordering } = this.state;

    const searchPlaceholder = intl.formatMessage({
      id: 'app.program_collection.search',
      description: 'Placeholder for search entry',
      defaultMessage: 'Search...',
    });

    const sortText = intl.formatMessage({
      id: 'app.program_collection.sort',
      description: 'Button label for sort options',
      defaultMessage: 'Sort',
    });

    return (
      <Fragment>
        <Grid centered columns={5}>
          <Grid.Row>
            <Grid.Column />
            <Grid.Column />
            <Grid.Column>
              <Header as="h1" textAlign="center">
                {label}
              </Header>
            </Grid.Column>
            <Grid.Column textAlign="right">
              <Input
                className="prompt"
                icon="search"
                placeholder={searchPlaceholder}
                onChange={this.handleSearchChange}
              />
            </Grid.Column>
            <Grid.Column>
              <Dropdown
                text={sortText}
                icon="sort"
                floating
                labeled
                button
                className="icon"
              >
                <Dropdown.Menu>
                  <Dropdown.Item onClick={this.handleOrderingChange} name="name">
                    <FormattedMessage
                      id="app.program_collection.name"
                      description="Button label to sort by name"
                      defaultMessage="Name"
                    />
                    {
                      ordering === 'name' ? (
                        <Icon name="caret down" />
                      ) : (
                        <Icon name="caret up" />
                      )
                    }
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Card.Group centered>
          {
            programs.results.map(program => (
              <Card key={program.id}>
                <Card.Content>
                  <Card.Header>
                    {program.name}
                  </Card.Header>
                  <Card.Meta>
                    {
                      owned ? (
                        <FormattedMessage
                          id="app.program_collection.mine"
                          description="Label to indicate program owned by user"
                          defaultMessage="Mine"
                        />
                      ) : program.user.username
                    }
                  </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                  <Button primary id={program.id} data-owned={owned} onClick={onProgramClick}>
                    {
                      owned ? (
                        <FormattedMessage
                          id="app.program_collection.work"
                          description="Button label to keep working on program"
                          defaultMessage="Keep Working"
                        />
                      ) : (
                        <FormattedMessage
                          id="app.program_collection.view"
                          description="Button label to view a program"
                          defaultMessage="View"
                        />
                      )
                    }
                  </Button>
                  {
                    owned ? (
                      <Button
                        negative
                        id={program.id}
                        name={program.name}
                        onClick={onRemoveClick}
                        floated="right"
                      >
                        <FormattedMessage
                          id="app.program_collection.remove"
                          description="Button label to remove a program"
                          defaultMessage="Remove"
                        />
                      </Button>
                    ) : (null)
                  }
                </Card.Content>
              </Card>
            ))
          }
        </Card.Group>
        {
          programs.total_pages > 1 ? (
            <Grid centered>
              <Grid.Row>
                <CustomPagination
                  defaultActivePage={1}
                  totalPages={programs.total_pages}
                  onPageChange={this.handlePageChange}
                />
              </Grid.Row>
            </Grid>
          ) : (null)
        }
      </Fragment>
    );
  }
}

ProgramCollection.defaultProps = {
  owned: false,
};

ProgramCollection.propTypes = {
  programs: PropTypes.shape({
    next: PropTypes.string,
    previous: PropTypes.string,
    total_pages: PropTypes.number,
    results: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        user: PropTypes.shape({
          username: PropTypes.string.isRequired,
        }).isRequired,
      }),
    ),
  }).isRequired,
  label: PropTypes.string.isRequired,
  owned: PropTypes.bool,
  onProgramClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default hot(module)(injectIntl(ProgramCollection));
