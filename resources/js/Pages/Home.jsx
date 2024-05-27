import { Head } from '@inertiajs/react';
import ChatLayout from "@/Layouts/ChatLayout.jsx";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

function Home({ auth }) {
    return <>Messages</>
}

Home.layout = (page) =>{
    return(
    <AuthenticatedLayout
    user ={page.props.auth.user}>
        <ChatLayout children = {page}/>
    </AuthenticatedLayout>
    )
}

export default Home;
