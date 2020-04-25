import React, { useEffect } from 'react'

import { useDispatch } from 'react-redux'

import locationHelper from '../../services/locationApi'

import { setLocation } from '../../reducers/userReducer'

const Header = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    async function data () {
      locationHelper.getLocation((data) => dispatch(setLocation(data)))
      setTimeout(() => {
        data()
      }, 600000)
    }
    data()
  }, [dispatch])

  return (
    <div className="greenBox" id="Header">
      <img src="logo.png" alt="DeskYoo" width="400px" height="auto"></img>
    </div>
  )
}

export default Header