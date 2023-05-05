/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unused-state */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/label-has-associated-control */
import {Component} from 'react'
import {v4 as uuid4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    inputText: '',
    dateText: '',
    appointmentList: [],
    isFilterActive: false,
  }

  onTitle = event => {
    this.setState({inputText: event.target.value})
  }

  onDate = event => {
    this.setState({
      dateText: event.target.value,
    })
  }

  onFilterActiveBtn = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  onSubmitBtn = event => {
    event.preventDefault()

    const {inputText, dateText, onLiked} = this.state

    const dateFormate = dateText
      ? format(new Date(dateText), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: uuid4(),
      inputText,
      dateText: dateFormate,
      onLiked: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      dateText: '',
      inputText: '',
    }))
  }

  onLikeBtn = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(each => {
        if (each.id === id) {
          return {...each, onLiked: !each.onLiked}
        }
        return each
      }),
    }))
  }

  getFilterAppointment = () => {
    const {appointmentList, isFilterActive} = this.state
    if (isFilterActive) {
      return appointmentList.filter(eachItem => eachItem.onLiked === true)
    }
    return appointmentList
  }

  render() {
    const {appointmentList, dateText, inputText} = this.state
    const filterAppointmentList = this.getFilterAppointment()

    return (
      <div className="container">
        <div className="card">
          <div className="img-input-card">
            <div>
              <h1>Add Appointment</h1>
              <form onSubmit={this.onSubmitBtn}>
                <div className="label-card">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    placeholder="Title"
                    onChange={this.onTitle}
                    value={inputText}
                    id="title"
                    autoComplete="OFF"
                  />
                </div>
                <div className="label-card">
                  <label htmlFor="date">DATE</label>
                  <input
                    type="date"
                    id="date"
                    onChange={this.onDate}
                    value={dateText}
                  />
                </div>
                <button className="add-btn" type="submit">
                  Add
                </button>
              </form>
            </div>
            <div className="img-card">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
              />
            </div>
          </div>
          <hr className="separator" />
          <div className="btn-head-card">
            <h1>Appointments</h1>
            <div className="star-btn-card">
              <button className="star-btn" onClick={this.onFilterActiveBtn}>
                Starred
              </button>
            </div>
          </div>
          <ul className="ul-card">
            {filterAppointmentList.map(each => (
              <AppointmentItem
                appointmentDetails={each}
                key={each.id}
                onLikeBtn={this.onLikeBtn}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
