import Image from "next/image"

interface EventDetailItemProps {
    icon: string
    alt: string
    label: string
}

const EventDetailItem = ({
    icon,
    alt,
    label
}: EventDetailItemProps) => (
    <div className="flex gap-2 items-center flex-row">
        <Image src={icon} alt={alt} width={17} height={17}/>
        <p>{label}</p> 
    </div>
)


export default EventDetailItem;