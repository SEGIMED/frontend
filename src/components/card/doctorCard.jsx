


import Avatars from '../avatar/avatarChat';


export default function DoctorCard({ doctor, button }) {
    const specialtiesString = doctor?.specialties?.map(specialty => specialty.name).join(' ');


    

    return (
        <div className="flex justify-between w-full border-b border-b-[#cecece] px-6 py-2 items-center">
            <div className="flex gap-3 items-center">
                <div className="w-12 h-12 flex justify-center items-center">
                    <Avatars avatar={doctor.avatar} />
                </div>
                <p className="text-start text-[#686868] font-normal text-base leading-6">{doctor?.name} {doctor?.lastname} - {specialtiesString ? specialtiesString : null}</p>
            </div>
            {button}
        </div>
    );
}
