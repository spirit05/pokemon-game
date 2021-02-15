export const Button = ( { cb, className, title, disabled = false }) => {
    return (
        <button className={ className }
            onClick = { () => cb() }
            disabled = { disabled }
        >
            { title }
        </button>
    )
}