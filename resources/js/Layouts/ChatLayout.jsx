import {usePage} from "@inertiajs/react";
import {useEffect, useState} from "react";
const ChatLayout = ({children}) => {
    const page = usePage();
    const conversations = page.props.conversations;
    const selectedConversation = page.props.selectedConversations;  // Corrected from selectConversations to selectedConversations
    const [localConversations,setLocalConversations] = useState([]);
    const [sortedConversations,setSortedConversations] = useState([]);
    const {onlineUsers, setOnlineUsers} = useState({});

    const isUserOnline = (userId) => onlineUsers[userId];

    console.log("conversations" , conversations);
    console.log("selectedConversations" , selectedConversation);

    useEffect(() => {
        setSortedConversations(
            localConversations.sort((a,b) => {
                if(a.blocked_at && b.blocked_at){
                    return a.blocked_at > b.blocked_at ? 1 : -1;
                } else if (a.blocked_at){
                    return 1;
                } else if (b.blocked_at){
                    return -1;
                }
                if (a.last_message_date && b.last_message_date){
                    return b.last_message_date.localeCompare(
                        a.last_message_date
                    )
                } else if (a.last_message_date){
                    return -1;
                } else if (b.last_message_date){
                    return 1;
                }else{
                    return 0;
                }
            })
        );
    }, [localCononversations]);

    useEffect(() => {
        setLocalConversations(conversations);
    }, [conversations]);

    useEffect(() => {
        Echo.join('online')
            .here((users) => {
                const onlineUsersObject = Object.fromEntries(users.map((user)=>[user.id,user]))
                setOnlineUsers((prevOnlineUsers) => {
                    return { ...prevOnlineUsers, ...onlineUsersObject}
                });
    })
            .joining((user) => {
                setOnlineUsers((prevOnlineUsers) => {
                    const updatedUsers = {...prevOnlineUsers};
                    updatedUsers[user.id] = user;
                    return updatedUsers;
                })
        })
            .leaving((user) => {
                setOnlineUsers((prevOnlineUsers) => {
                    const updatedUsers = {...prevOnlineUsers};
                    delete updatedUsers[user.id];
                    return updatedUsers;
                })
                console.log('leaving', user)
            }).error((error)=>{
                console.error("error", error);
        });

        return () => {
            Echo.leave("online");
        }

    }, []);
    return (
        <>

        </>
    )
}

export default ChatLayout;
