import { Menu } from "@headlessui/react";
import { LockOpenIcon } from "@heroicons/react/24/solid";

export default function UserOptionsDropdown({ conversation }) {
    return (
        <div>
            <Menu className="relative inline-block text-left">
                <div>
                    <Menu.Button className="flex justify-center items-center w-8 h-8 rounded-full hover:bg-black/40">
                        <EllipsisVerticalIcon className="h-5 -5" />
                    </Menu.Button>
                </div>
                <Transition as={fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 mt-2 w-48 rounded-md bg-gray-800 shadow-lg z-50">
                        <Menu.Item>
                            {({ active }) => (
                                <button
                                    onClick={onBlockUserClick}
                                    className={`${
                                    active ? "bg-black/30 text-white":"text-gray-100"
                                        } group flex w-full items-center rounded-md px-2 py-2 text-sm`}>
                                    <LockOpenIcon className="w-4 h-4 mr-2" />
                                    {conversation.blocked_at && (<>
                                        <LockOpenIcon className="w-4 h-4 mr-2" />
                                        Unblock User
                                    </>)}
                                </button>
                            )}
                        </Menu.Item>
                        </Menu.Items>
                </Transition>
            </Menu>
        </div>
    )
}
