import React, { PropTypes } from 'react'
import { gql, graphql } from 'react-apollo'

import { TEAMS } from '../constants'
import './Card.css'

function Card ({ card, isLeader = false, selectCard }) {
  const classes = [
    'card',
    card.selected && 'card--is-selected',
    card.team === TEAMS.BLUE && 'card--blue-team',
    card.team === TEAMS.RED && 'card--red-team',
    card.team === TEAMS.DEATH && 'card--death',
    card.team === TEAMS.NEUTRAL && 'card--neutral',
    isLeader && 'card--leader'
  ].filter(Boolean).join(' ')

  return <div className={classes} onClick={() => !isLeader && selectCard(card.id)}>
    {card.name}
  </div>
}

Card.propTypes = {
  card: PropTypes.object.isRequired,
  showUnselected: PropTypes.bool
}

const Mutation = gql`
  mutation SelectCard($id: Int!) {
    cardSelect(id: $id) {
      id
      __typename
      selected
    }
  }
`

export default graphql(Mutation, {
  props: ({ mutate }) => ({
    selectCard: (id) => mutate({
      variables: { id },
      optimisticResponse: {
        __typename: 'Mutation',
        cardSelect: {
          __typename: 'Card',
          id: id,
          selected: true
        }
      }
    })
  })
})(Card)
