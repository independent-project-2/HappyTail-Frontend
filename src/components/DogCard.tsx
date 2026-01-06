
interface DogCardProps {
    imageUrl: string;
    dogType: string;
    address: string;
    description: string;
    price: string;
}



export default function DogCard(
    props: DogCardProps
) {

    return (
        <>
            <div className="relative shadow-xl rounded-xl text-black flex flex-col overflow-hidden">
                <img
                    src={props.imageUrl}
                    alt="Dog Image"
                    className="w-full object-cover"
                />

                <div className="p-4 flex flex-col gap-2">
                    <div className="font-bold text-xl">{props.dogType}</div>
                    <div>{props.address}</div>
                    <div className="text-gray-500 font-medium">{props.description}</div>
                    <div className="text-lg font-semibold">{props.price}</div>

                    <button className="absolute right-0 bottom-0 text-purple-700 border-2 border-purple-700 border-solid rounded-xl p-2 m-2 hover:bg-purple-700 hover:text-white transition-colors">
                        View More
                    </button>
                </div>
            </div>
        </>
    )
}