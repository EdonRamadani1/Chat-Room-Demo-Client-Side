import TrafficLight from "./trafficlight";
import "../App.css";

const Street = (props) => {

    return(
        <div>
            <div className="labName">lab 17</div>
            <div className="flex-container">
                <TrafficLight street="Edon" />
                <TrafficLight street="Ramadani" />
                <TrafficLight street="Info3139" />
            </div>
        </div>
    )
};

export default Street;
