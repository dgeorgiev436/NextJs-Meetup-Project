import Head from "next/head"
import MeetupList from "../components/meetups/MeetupList"
import {MongoClient} from "mongodb"
import {Fragment} from "react"

const HomePage = (props) => {
    return(
		<Fragment>
			<Head>
				<title>React Meetups</title>
				<meta name="description" content="List of active meetups"></meta>
			</Head>
			<MeetupList meetups={props.meetups}/>
		</Fragment>
    )
}

// export const getServerSideProps = async(context) => {
// 	const req = context.req;
// 	const res = context.res;
	
// 	return {
// 		props: {
// 			meetups: DUMMY_MEETUPS
// 		}
// 	}
// }

// makes props wait until component functions (useEffect) are executed and data is loaded
export const getStaticProps = async() => {
	
		const client = await MongoClient.connect("mongodb+srv://Admin:hesoyam@cluster0.eykfx.mongodb.net/MeetupsProject?retryWrites=true&w=majority");
		const db = client.db();
		
		const meetupCollection = db.collection("meetups");
	
		const meetups = await meetupCollection.find().toArray();
	
		client.close();
	
    return {
        props: {
            meetups: meetups.map(meetup => ({
				title: meetup.title,
				image: meetup.image,
				id: meetup._id.toString()
			}))
        },
// 		Incremental static generation feature ( re pre-generate every 1 sec after deployement)
		revalidate: 1
    }
}


export default HomePage;