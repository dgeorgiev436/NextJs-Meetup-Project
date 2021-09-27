import {useRouter} from "next/router"
import {Fragment} from "react"
import MeetupDetail from "../../components/meetups/MeetupDetail"
import {MongoClient, ObjectId} from "mongodb"
import Head from "next/head"


const MeetupDetails = (props) => {
    const router = useRouter();

    return(
		<Fragment>
			<Head>
				<title>{props.meetupData.title}</title>
				<meta name="description" content={props.meetupData.description}></meta>
			</Head>
			<MeetupDetail 
				img = {props.meetupData.image}
				title = {props.meetupData.title}
				address = {props.meetupData.address}
				description = {props.meetupData.description}
			/>
		</Fragment>
    )
}


// Tell next.js for which dynamic parameter values the page should be pre-generated
export const getStaticPaths = async() => {
	
	const client = await MongoClient.connect("mongodb+srv://Admin:hesoyam@cluster0.eykfx.mongodb.net/MeetupsProject?retryWrites=true&w=majority")
	const db = client.db();
	const meetupCollection = db.collection("meetups");
	
	const meetups = await meetupCollection.find({}, {_id: 1}).toArray();
	
	client.close();

	
	return {
		fallback: false,
		paths: meetups.map(meetup => ({params: {meetupId: meetup._id.toString()}}))
	}
}


// Returns props for specific meetup
export const getStaticProps = async(context) => {
	const meetupId = context.params.meetupId
	
	const client = await MongoClient.connect("mongodb+srv://Admin:hesoyam@cluster0.eykfx.mongodb.net/MeetupsProject?retryWrites=true&w=majority")
	const db = client.db();
	const meetupCollection = db.collection("meetups");
	
	const selectedMeetup = await meetupCollection.findOne({_id: ObjectId(meetupId)})
	
	client.close();

// 	Runs on server side
	console.log(selectedMeetup)
	
	return {
		props: {
			meetupData: {
				id: selectedMeetup._id.toString(),
				title: selectedMeetup.title,
				image: selectedMeetup.image,
				description: selectedMeetup.description
			}
		}
	}
}

export default MeetupDetails;