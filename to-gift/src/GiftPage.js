import React, { useState, useEffect } from 'react'
import db from './firebase'
import firebase from 'firebase'

function GiftPage(props) {
  const [senderName, setSenderName] = useState('')
  const [senderGift, setSenderGift] = useState('')
  const [partyInfo, setPartyInfo] = useState({
    whoParty: 'loading...',
    partyDate: 'loading...',
  })
  const [gifts, setGifts] = useState([])

  //fetch information of the routed id
  useEffect(() => {
    db.child(props.match.params.id).on('value', (partyInfo) => {
      const partyinfo = partyInfo.val()

      setPartyInfo(partyinfo)
    })

    //fetch all the sent sent_gifts
    const itemsRef = firebase
      .database()
      .ref(`list/${props.match.params.id}/items`)
    itemsRef.on('value', (snapshot) => {
      // console.log(snapshot.val());
      let items = snapshot.val()
      let newState = []
      for (let item in items) {
        newState.push({
          id: item,
          gift: items[item].gift,
          user: items[item].user,
        })
      }
      setGifts(newState)
    })
    return () => {
      //cleanup
    }
  }, [props.match.params.id])
  console.log(gifts)
  //handle submit
  const handleSubmit = (e) => {
    e.preventDefault()
    const itemsRef = firebase
      .database()
      .ref(`list/${props.match.params.id}/items`)
    const info = {
      user: senderName,
      gift: senderGift,
    }

    itemsRef.push(info)
    setSenderName('')
    setSenderGift('')
  }

  //handle remove gift
  const removeGift = (giftid) => {
    const giftRef = firebase
      .database()
      .ref(`/list/${props.match.params.id}/items/${giftid}`)
    giftRef.remove()
  }
  return (
    <div className="giftPage">
      <div className="gift_main_inner gift_main_wrapper">
        <div className="gift_who_info">
          <h3>Recipient: {partyInfo.whoParty}</h3>
          <h3>When: {partyInfo.partyDate}</h3>
          <form onSubmit={handleSubmit} className="gift_form">
            <span className="headings">What is your Name?</span>
            <span>
              <input
                type="text"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
              />
            </span>
            <span className="headings">What are you bringing?</span>
            <span>
              <input
                type="text"
                value={senderGift}
                onChange={(e) => setSenderGift(e.target.value)}
              />
            </span>

            <span>
              <button className="btn btn_send">ADD GIFT +</button>
            </span>
          </form>
          <div className="sent_gifts">
            {gifts.map((gift) => {
              return (
                <span className="gift">
                  <span key={gift.id}>
                    <b>Name</b> <i>{gift.user}</i>
                    <p>
                      <b>Gift</b> <i>{gift.gift}</i>
                    </p>
                    <button
                      className="btn_remove"
                      onClick={() => removeGift(gift.id)}
                    >
                      REMOVE GIFT
                    </button>
                  </span>
                </span>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default GiftPage
