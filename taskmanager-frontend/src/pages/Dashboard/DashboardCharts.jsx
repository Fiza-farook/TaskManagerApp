import PropTypes from "prop-types";

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

const DashboardCharts = ({ taskStatus }) => {

    const data = {
        labels: taskStatus.map(
            item => item.status
        ),

        datasets: [
            {
                data: taskStatus.map(
                    item => item.count
                ),

                backgroundColor: [
                    "#0d6efd",
                    "#198754",
                    "#ffc107",
                    "#dc3545",
                    "#6f42c1",
                    "#20c997",
                ],

                borderWidth: 2,
            },
        ],
    };

    return (

        <div className="card shadow-sm border-0 h-100">

            <div className="card-header bg-white">

                <h5 className="mb-0">
                    Task Status Distribution
                </h5>

            </div>

            <div
                className="card-body d-flex justify-content-center align-items-center"
                style={{ height: "350px" }}
            >

                {taskStatus.length > 0 ? (

                    <Doughnut
                        data={data}
                    />

                ) : (

                    <p className="text-muted">
                        No task data available.
                    </p>

                )}

            </div>

        </div>

    );

};

DashboardCharts.propTypes = {
    taskStatus: PropTypes.array.isRequired,
};

export default DashboardCharts;