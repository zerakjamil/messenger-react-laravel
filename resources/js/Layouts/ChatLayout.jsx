import {usePage} from "@inertiajs/react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

const ChatLayout = ({children}) => {
    const page = usePage();
    const conversations = page.props.conversations;
    const selectedConversation = page.props.selectedConversations;  // Corrected from selectConversations to selectedConversations
    console.log("conversations" , conversations);
    console.log("selectedConversations" , selectedConversation);
    return (
        <AuthenticatedLayout>
            <div>ChatLayout</div>
            <div>{children}</div>
        </AuthenticatedLayout>
    )
}

export default ChatLayout;
