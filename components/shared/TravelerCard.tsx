import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { IUser } from "@/types/user.interface";
import Image from "next/image";
import { Verified } from "lucide-react";

const TravelerCard = ({ traveler }: {
  traveler: IUser
}) => {
  return (
    <div className="p-4 sm:p-6 max-w-sm w-full bg-white shadow-lg rounded-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
      <Card className="pt-0">
        <div
          style={{
            backgroundImage: `url(${'/images/bg-banner/travel-plans.jpg'})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat'
          }}
          className="relative rounded-lg">
          <Image src={traveler?.profileImage || '/images/man.png'} width={100} height={100} alt={traveler?.name} />
        </div>
        <CardContent>
          {/* Traveler Name and Location */}
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-md font-semibold text-gray-800 flex items-center gap-2">{traveler?.name} {traveler?.verifiedBadge && <Verified width={20} height={20} />}</h3>
            <span className="text-sm text-gray-500">({traveler?.currentLocation})</span>
          </div>

          {/* Traveler Interests */}
          <div className="text-sm text-gray-600 mb-2">
            <h4 className="font-semibold">Interests:</h4>
            <ul className="flex flex-wrap gap-2 mt-1">
              {traveler?.interests.map((interest, index) => (
                <li
                  key={index}
                  className="bg-blue-100 text-blue-800 py-1 px-3 rounded-full text-xs"
                >
                  {interest}
                </li>
              ))}
            </ul>
          </div>

          {/* Travel Plans */}
          <CardDescription>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Travel Plans: {traveler?.travelPlansCount}
              </span>
              <button className="text-blue-500 hover:underline text-sm">
                View Plans
              </button>
            </div>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default TravelerCard;
