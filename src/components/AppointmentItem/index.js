/* eslint-disable arrow-body-style */
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, onLikeBtn} = props
  const {inputText, id, dateText, onLiked} = appointmentDetails
  const onLikedBtnItem = () => {
    onLikeBtn(id)
  }
  const onLike = onLiked
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  return (
    <li className="li-card">
      <div className="head-star-card">
        <p className="heading">{inputText}</p>
        <div className="star-icon">
          <div>
            <button
              type="submit"
              className="like-icon-btn"
              onClick={onLikedBtnItem}
              data-testid="star"
            >
              <img src={onLike} alt="star" />
            </button>
          </div>
        </div>
      </div>
      <p className="date">Date: {dateText}</p>
    </li>
  )
}

export default AppointmentItem
