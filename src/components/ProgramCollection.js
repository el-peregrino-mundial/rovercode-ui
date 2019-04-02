import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { hot } from 'react-hot-loader';
import {
  Button,
  Card,
  Grid,
  Header,
} from 'semantic-ui-react';

import CustomPagination from './CustomPagination';

class ProgramCollection extends PureComponent {
  handlePageChange = (e, { activePage }) => {
    const { onPageChange, owned } = this.props;

    onPageChange(activePage, owned);
  }

  render() {
    const {
      label,
      onProgramClick,
      onRemoveClick,
      programs,
      owned,
    } = this.props;

    return (
      <Fragment>
        <Header as="h1" textAlign="center">
          {label}
        </Header>
        <Card.Group centered>
          {
            programs.results.map(program => (
              <Card key={program.id}>
                <Card.Content>
                  <Card.Header>
                    {program.name}
                  </Card.Header>
                  <Card.Meta>
                    { owned ? 'Mine' : program.user }
                  </Card.Meta>
                </Card.Content>
                <Card.Content extra>
                  <Button primary id={program.id} onClick={onProgramClick}>
                    { owned ? 'Keep Working' : 'View' }
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
                        Remove
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
        user: PropTypes.number.isRequired,
      }),
    ),
  }).isRequired,
  label: PropTypes.string.isRequired,
  owned: PropTypes.bool,
  onProgramClick: PropTypes.func.isRequired,
  onRemoveClick: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default hot(module)(ProgramCollection);