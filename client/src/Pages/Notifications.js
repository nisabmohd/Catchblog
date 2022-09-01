import React, { useContext } from 'react'
import { AppContext } from '../App'
import { Notify } from '../components/Notify'
import { UserCard } from '../components/UserCard'

export const Notifications = () => {
  const context = useContext(AppContext)

  return (
    <div className='container'>
      <div className="container-left">
        <h3 style={{ marginBottom: '33px' }}>Notifications</h3>
        <Notify content="Liked Your Post" postid="7fe87d7a-4396-49b6-956e-d60d1eb938f3" date="2022-08-31" uid="96dc546d-72c5-4236-8cad-f1c0351bfe41" />
        <Notify content="Saved Your Post" postid="7fe87d7a-4396-49b6-956e-d60d1eb938f3" date="2022-08-30" uid="eb81bbed-4993-4006-82c9-df8ffb76e3f9" />
        <Notify content="Saved Your Post" postid="7fe87d7a-4396-49b6-956e-d60d1eb938f3" date="2022-08-25" uid="308d75ec-7036-43f5-88bc-80f0c5912395" />
        <Notify content="Liked Your Post" postid="7fe87d7a-4396-49b6-956e-d60d1eb938f3" date="2022-08-21" uid="308d75ec-7036-43f5-88bc-80f0c5912395" />
      </div>
      <div className="container-right">
        {<UserCard uid={context.auth.uid} />}
      </div>
    </div>
  )
}
