import {useRouter} from "next/router";

export default function id(){
const router=useRouter();
    return(
        <>
            <h1> movie Details</h1>
            <p>movie ID: {router.query.id}</p>
        </>
    )
}