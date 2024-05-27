import { Head } from '@inertiajs/react';
import ChatLayout from "@/Layouts/ChatLayout.jsx";

export default function Home({ auth }) {
    return (
        <ChatLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">You're logged in!</div>
                    </div>
                </div>
            </div>
        </ChatLayout>
    );
}
