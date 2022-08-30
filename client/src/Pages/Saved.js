import React, { useContext } from 'react'
import { AppContext } from '../App'
import { PostCard } from '../components/PostCard'
import { UserCard } from '../components/UserCard'

export const Saved = () => {
    const context = useContext(AppContext)

  return (
    <div className='container'>
            <div className="container-left">
                <PostCard img="https://res.cloudinary.com/practicaldev/image/fetch/s--SeFZpZ8W--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/612541/6ce4b30d-2f5e-4c87-bb95-5c5543dd605c.jpg" uid="gjf956168hjgjhjk" name="Michał Hawełka" date="2022-08-29" content="Basic Next.js app - blog post page [Building Personal Blog Website Part 3]" tags={["Dev"]} />
                <PostCard img="https://res.cloudinary.com/practicaldev/image/fetch/s--SeFZpZ8W--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/612541/6ce4b30d-2f5e-4c87-bb95-5c5543dd605c.jpg" uid="gjf956168hjgjhjk" name="Michał Hawełka" date="2022-08-29" content="Why 0.1+0.2==0.3 False?" tags={["HTML", "CSS"]} />
                <PostCard img="https://res.cloudinary.com/practicaldev/image/fetch/s--SeFZpZ8W--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/612541/6ce4b30d-2f5e-4c87-bb95-5c5543dd605c.jpg" uid="gjf956168hjgjhjk" name="Michał Hawełka" date="2022-07-09" content="7 Useful Articles Every New Developer Should Bookmark 👍💯" tags={["dev", "coding", "learning"]} />
                <PostCard img="https://res.cloudinary.com/practicaldev/image/fetch/s--SeFZpZ8W--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/612541/6ce4b30d-2f5e-4c87-bb95-5c5543dd605c.jpg" uid="gjf956168hjgjhjk"  name="Michał Hawełka" date="2022-07-09" content="I built a REST API with Redis" tags={["redis","api"]} />
            </div>
            <div className="container-right">
                <UserCard uid={context.auth.uid} />
            </div>
        </div>
  )
}
