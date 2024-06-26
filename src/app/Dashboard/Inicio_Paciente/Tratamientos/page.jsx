// 'use client'

// import {  useAppSelector } from '@/redux/hooks';
// import TratamientoDocCard from '@/components/Buttons/tratamientoDocCard';

// import DoctorCard from '@/components/card/doctorCard';
// import Ordenar from '@/components/Buttons/Ordenar';
// import FiltrosPaciente from '@/components/Buttons/FiltrosPaciente';
// import { useState } from 'react';

// export default function DoctoresPte() {
    
//     const doctores = useAppSelector(state => state.doctores) || []
//     const isLoading = useAppSelector(state => state.doctores.length === 0);
//     const [isFilterOpen, setIsFilterOpen] = useState(false);
//     const [isSorted, setIsSorted] = useState(false);

//     const filteredDoctor = doctores?.filter((doctor) =>
//         doctor.name.toLowerCase() || doctor.lastname.toLowerCase()
//     );

//     const sortedDoctor = isSorted 
//         ? [...filteredDoctor].sort((a, b) => a.name.localeCompare(b.name)) 
//         : filteredDoctor;

//     const toggleFilterMenu = () => {
//         setIsFilterOpen(!isFilterOpen);
//     }

//     const handleSortClick = () => {
//         setIsSorted(!isSorted);
//     };

    
//     return (
//         <div className="h-full w-full flex flex-col">

//             <div className="flex justify-between border-b border-b-[#cecece] px-6 py-2">
//                 <FiltrosPaciente
//                     isOpen={isFilterOpen}
//                     toggleMenu={toggleFilterMenu}
//                     onClickSort={handleSortClick}
//                 />
//                 <Ordenar/>
//             </div>
//             <div className="flex flex-col items-start justify-center w-full">
//             {sortedDoctor?.map(doctor => (
//                     <DoctorCard key={doctor.id} doctor={doctor}
                    
//                     button={<TratamientoDocCard id={doctor.id}/>}
//                      />
//                 ))}
//             </div>
//         </div>
//     )
// };

export default function name(params) {
    return (
        <></>
    )
}