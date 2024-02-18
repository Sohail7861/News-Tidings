import React, { Component } from 'react'
import loading from './loading.gif'
export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img src={loading} style={{height:'50px'}} alt="loading"/>
      </div>
    )
  }
}
