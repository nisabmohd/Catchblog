import { Box } from "@mui/material"
import { PostCard } from "../components/PostCard"
import { Recommended } from "../components/Recommended"


export const Home = () => {
    return (
        <Box style={{ backgroundColor: 'palette.text.primary', marginBottom: '39px' }} className="container">
            <div className="container-left">
                <PostCard img="https://res.cloudinary.com/practicaldev/image/fetch/s--SeFZpZ8W--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/612541/6ce4b30d-2f5e-4c87-bb95-5c5543dd605c.jpg" uid="gjf956168hjgjhjk" name="Michał Hawełka" date="2022-08-29" content="Basic Next.js app - blog post page [Building Personal Blog Website Part 3]" tags={["Dev"]} />
                <PostCard img="https://res.cloudinary.com/practicaldev/image/fetch/s--cQtT4DlT--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/670173/7cc87859-c2e6-4302-891f-f64bac5a5df2.jpg" uid="gjf956168hjgjhjk"  name="Mysterio" date="2022-08-29" content="Why 0.1+0.2==0.3 False?" tags={["HTML","CSS"]} />
                <PostCard img="https://res.cloudinary.com/practicaldev/image/fetch/s--E4Y6_dYo--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/256258/2ee24be0-051c-498a-8c47-087cd94e8b89.jpg" uid="gjf956168hjgjhjk"  name="Jeremy Ikwuje" date="2022-07-09" content="7 Useful Articles Every New Developer Should Bookmark 👍💯" tags={["dev","coding","learning"]} />
                <PostCard img="https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2F76525761.jpg?alt=media&token=dbc95980-be1d-4f16-ae70-24ee874cd885" name="Nisab Mohd" date="2022-08-29" uid="gjf956168hjgjhjk"  content="5 Most Common useState Mistakes React Developers Often Make" tags={["opensource","git","javascript"]} />
                <PostCard img="https://res.cloudinary.com/practicaldev/image/fetch/s--E4Y6_dYo--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/256258/2ee24be0-051c-498a-8c47-087cd94e8b89.jpg" uid="gjf956168hjgjhjk"  name="Abhishek Keshri" date="2022-07-09" content="I built a REST API with Redis" tags={["redis","api"]} />
                
            </div>
            <div className="container-right">
                {/* <Top /> */}
                <Recommended />
            </div>

        </Box>
    )
}
