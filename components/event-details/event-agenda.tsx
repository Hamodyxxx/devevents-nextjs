interface EventAgendaProps {
    agendaItems: string[]
}

const EventAgenda = ({
    agendaItems
}: EventAgendaProps) => {
    return (
        <div className="agenda">
            <h2>Agenda</h2>
            <ul>
                {agendaItems.map((item, index) => (
                    <li key={`${item}${index}`}>{item}</li>
                ))}
            </ul>
        </div>
    )
}

export default EventAgenda;