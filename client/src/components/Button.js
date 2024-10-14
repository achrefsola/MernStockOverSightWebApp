
export default function Button({onClick,name}) {
    
    return (
        <div className="custom-col-sm-4">
            <button type="button" className="btn btn-primary " onClick={onClick} >{name}</button>
        </div>
    );
}
