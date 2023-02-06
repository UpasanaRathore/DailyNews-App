import React, { Component } from 'react'
import spinner from './spinner.gif'

export class Spinner extends Component {
  render() {
    return (
      <div className='d-flex justify-content-center my-3'>
        <img src={spinner} alt="loading" height={50}/>
      </div>
    )
  }
}

export default Spinner
