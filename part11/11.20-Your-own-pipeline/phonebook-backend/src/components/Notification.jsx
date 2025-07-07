const Notification = ({ sucessMessage, errorMessage }) => {

    if (sucessMessage !== null) {
        return (
            <div>
                <h1 className="sucess">{sucessMessage} </h1>
            </div>
        )
    } else if (errorMessage !== null) {
        return (
            <div>
                <h1 className="error">{errorMessage} </h1>
            </div>
        )
    } else { return; }
}
export default Notification