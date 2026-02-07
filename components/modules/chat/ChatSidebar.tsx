import { chats } from "@/data/chats";
import { getAllParticipationsOfAnUser } from "@/services/trip-participant/tripParticipantManagement";
import { shortText } from "@/utils/shortText";
import Image from "next/image";
import Link from "next/link";

export default async function ChatSidebar() {

  const allParticipations = await getAllParticipationsOfAnUser()

  return (
    <div className="w-80 border-r border-gray-200 px-4 pb-4 overflow-y-auto max-h-[80vh] relative">
      <div className="sticky top-0 bg-white z-10 pb-5 border-b border-gray-200 py-4">
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Chats</h2>

        <input
          placeholder="Search Messenger"
          className="w-full rounded-md text-gray-700 border border-gray-200 px-3 py-2 text-sm outline-none"
        />
      </div>

      <div className="mt-5">
        {allParticipations?.length > 0 && allParticipations.map((participation: any) => {

          // const {user: {firstName, lastName, id, email, profileImage}} = participation

          const { trip: { id, title, planImages } } = participation

          return <Link key={participation.id} href={`/user/dashboard/join-room/${id}`}>
            <div
              className="flex items-center gap-3 p-2 rounded-lg cursor-pointer bg-gray-100 border mb-3 hover:bg-linear-to-r from-primary to-secondary group"
            >
              <div className="h-15 w-15 rounded-full"
                style={{
                  backgroundImage: `url(${planImages[0]})`,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover'
                }}
              >
                {/* <Image src={planImages[0]} width={50} height={50} alt="chat friend profile picture" className="rounded-full" /> */}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-700 group-hover:text-white">{shortText(title, 40)}</p>
                {/* <p className="text-sm text-gray-500 font-medium group-hover:text-white">
                {chat.lastMessage}
              </p> */}
              </div>
              {/* <span className="text-xs text-neutral-400 group-hover:text-white">{chat.time}</span> */}
            </div>
          </Link>
        })}
      </div>
    </div>
  );
}