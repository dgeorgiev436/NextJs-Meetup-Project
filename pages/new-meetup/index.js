import NewMeetupForm from "../../components/meetups/NewMeetupForm"
import {useRouter} from "next/router"
import Head from "next/head"
import {Fragment} from "react"


const NewMeetup = () => {
	const router = useRouter()
	
    const addMeetupHandler = async(meetupData) => { 
        const response = await fetch("/api/new-meetup", {
			method: "POST",
			body: JSON.stringify(meetupData),
			headers: {
				"Content-Type": "application/json"
			}
		});
		
		const data = await response.json();
		
		console.log(data);
		
		router.replace("/")
    }

    return(
		<Fragment>
		 <Head>
			<title>Add a new meetup</title>
			<meta name="description" content="Add your own meetups"></meta>
		 </Head>
         <NewMeetupForm onAddMeetup={addMeetupHandler} />
		</Fragment>
    )
}



export default NewMeetup;