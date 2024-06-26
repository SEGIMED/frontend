const CardExperts = (props) => {

    return (
        <div className="relative bg-white p-10 flex flex-col items-center gap-5 rounded-xl shadow-lg w-64">
            
            <div className="absolute -top-10">
                <img className="rounded-xl object-cover w-44 h-56" src={props.image} alt="" />
            </div>
            <div className="flex flex-col items-center gap-3 pt-40">
                <p className="text-2xl">{props.name}</p>
                <p className="text-center text-xl">{props.title}</p>
                <p className="text-center text-xs">{props.text}</p>
            </div>
        </div>
    )

};

export default CardExperts;