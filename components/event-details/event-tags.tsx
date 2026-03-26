interface EventTagsProps {
    tags: string[]
}

const EventTags = ({
    tags
}: EventTagsProps) => {
    return (
        <div className="flex flex-row gap-1.5 flex-wrap">
            {tags.map((tag, idx) => (
                <div className="pill" key={`${tag}${idx}`}>{tag}</div>
            ))}
        </div>
    )
}

export default EventTags;