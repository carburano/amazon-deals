import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import { routeActions } from 'redux-simple-router'

// import Divider from 'material-ui/lib/divider'
// import ListItem from 'material-ui/lib/lists/list-item'
import moment from 'moment'
require('moment/locale/de')
moment.locale('de')

function titleCase (string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

class Deals extends Component {
  render () {
    let lastTime = null
    const { dispatch, deals } = this.props
    return (
      <ul className='collection with-header'>
        {deals.reduce((memo, post, i) => {
          const time = titleCase(moment(post.offer.startsAt).calendar())

          if (lastTime !== time) {
            memo.push(<li key={'header_' + time} className='collection-header' style={{ backgroundColor: '#00bcd4', color: 'white' }}><h5>{time}</h5></li>)
            lastTime = time
          }

          let image = post.primaryImage || post.teaserImage
          if (image != null) {
            image = image.replace(/\.jpg$/ig, '._SL400_SL84_.jpg')
          }

          memo.push(<li className='collection-item avatar' key={post._id} onClick={() => dispatch(routeActions.push('/item/' + post._id))} style={{minHeight: 64}}>
            {image ? <img src={image} className='circle'/> : null}
            <span className='title'>{post.title}</span>
            <p>
              { post.offer.minDealPrice != null ? post.offer.minDealPrice : '?' }
              {' ' + (post.offer.currencyCode || '') + ' '}
              <strike>{post.offer.minCurrentPrice} {post.offer.currencyCode}</strike></p>
          </li>)

          return memo
        }, [])}
      </ul>
    )
  }
}

Deals.propTypes = {
  deals: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string.isRequired
  }).isRequired).isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps (state) {
  return {}
}

export default connect(mapStateToProps)(Deals)
