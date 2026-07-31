import PropTypes from "prop-types";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
);

const DashboardWorkload = ({ workload }) => {

    const data = {
        labels: workload.map(item => item.username),

        datasets: [
            {
                label: "Assigned Tasks",
                data: workload.map(item => item.task_count),
                backgroundColor: "#6f42c1",
                borderRadius: 8,
            },
        ],
    };

    return (

        <div className="card shadow-sm border-0 h-100">

            <div className="card-header bg-white">

                <h5 className="mb-0">

                    Workload Distribution

                </h5>

            </div>

            <div
                className="card-body"
                style={{ height: "350px" }}
            >

                {
                    workload.length > 0 ?

                        <Bar data={data} />

                        :

                        <p className="text-muted">
                            No workload data available.
                        </p>
                }

            </div>

        </div>

    );

};

DashboardWorkload.propTypes = {
    workload: PropTypes.array.isRequired,
};

export default DashboardWorkload;