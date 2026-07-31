import { useEffect } from "react";

const ToastNotification = ({
    show,
    title,
    message,
    type = "success",
    duration = 3000,
    onClose,
}) => {
    useEffect(() => {
        if (!show) return;

        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [show, duration, onClose]);

    if (!show) return null;

    const getToastClass = () => {
        switch (type) {
            case "success":
                return "bg-success text-white";

            case "danger":
                return "bg-danger text-white";

            case "warning":
                return "bg-warning text-dark";

            case "info":
                return "bg-info text-white";

            default:
                return "bg-primary text-white";
        }
    };

    return (
        <div
            className="position-fixed top-0 end-0 p-3"
            style={{
                zIndex: 1080,
            }}
        >
            <div
                className={`toast show shadow-lg border-0 ${getToastClass()}`}
            >
                <div className="toast-header">

                    <strong className="me-auto">
                        {title}
                    </strong>

                    <button
                        type="button"
                        className="btn-close"
                        onClick={onClose}
                    ></button>

                </div>

                <div className="toast-body">
                    {message}
                </div>

            </div>
        </div>
    );
};

export default ToastNotification;