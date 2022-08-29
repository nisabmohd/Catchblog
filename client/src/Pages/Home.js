import { Box } from "@mui/material"
import { PostCard } from "../components/PostCard"
import { Recommended } from "../components/Recommended"
import { Top } from "../components/Top"


export const Home = () => {
    return (
        <Box style={{ backgroundColor: 'palette.text.primary', marginBottom: '39px' }} className="container">
            <div className="container-left">
                <PostCard img="https://res.cloudinary.com/practicaldev/image/fetch/s--wOIFUB8h--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/organization/profile_image/934/43080df4-23de-46e6-99c7-60a318f29961.png" name="Fill Softwares" date="2022-08-29" content="Learn the hidden feature in Git - Stash" tags={["Dev"]} />
                <PostCard img="https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2F76525761.jpg?alt=media&token=dbc95980-be1d-4f16-ae70-24ee874cd885" name="Nisab Mohd" date="2022-08-29" content="5 Most Common useState Mistakes React Developers Often Make" tags={["opensource","git","javascript"]} />
                <PostCard img="https://res.cloudinary.com/practicaldev/image/fetch/s--cQtT4DlT--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/670173/7cc87859-c2e6-4302-891f-f64bac5a5df2.jpg" name="Mysterio" date="2022-08-29" content="Why 0.1+0.2==0.3 False?" tags={["HTML","CSS"]} />
                <PostCard img="https://res.cloudinary.com/practicaldev/image/fetch/s--wOIFUB8h--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/organization/profile_image/934/43080df4-23de-46e6-99c7-60a318f29961.png" name="Fill Softwares" date="2022-08-29" content="Learn the hidden feature in Git - Stash" tags={["Dev"]} />
                <PostCard img="https://firebasestorage.googleapis.com/v0/b/upload-pics-e599e.appspot.com/o/images%2F76525761.jpg?alt=media&token=dbc95980-be1d-4f16-ae70-24ee874cd885" name="Nisab Mohd" date="2022-08-29" content="5 Most Common useState Mistakes React Developers Often Make" tags={["opensource","git","javascript"]} />
                <PostCard img="https://res.cloudinary.com/practicaldev/image/fetch/s--cQtT4DlT--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/670173/7cc87859-c2e6-4302-891f-f64bac5a5df2.jpg" name="Mysterio" date="2022-08-29" content="Why 0.1+0.2==0.3 False?" tags={["HTML","CSS"]} />
            </div>
            <div className="container-right">
                <Top />
                <Recommended />
            </div>

        </Box>
    )
}
