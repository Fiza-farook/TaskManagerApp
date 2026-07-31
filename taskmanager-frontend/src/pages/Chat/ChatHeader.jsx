import PropTypes from "prop-types";

const ChatHeader = ({
    onClear,
    onDownload,
}) => {
    return (
        <div className="card border-0 shadow-sm mb-4">

            <div className="card-body d-flex justify-content-between align-items-center flex-wrap gap-3">

                <div>

                    <h3 className="mb-1">
                        <i className="bi bi-robot me-2 text-primary"></i>
                        AI Assistant
                    </h3>

                    <p className="text-muted mb-0">
                        Ask anything about your Task Management System.
                    </p>

                </div>

                <div className="d-flex gap-2">

                    <button
                        className="btn btn-outline-danger"
                        onClick={onClear}
                    >
                        <i className="bi bi-trash me-2"></i>
                        Clear Chat
                    </button>

                    <button
                        className="btn btn-primary"
                        onClick={onDownload}
                    >
                        <i className="bi bi-download me-2"></i>
                        Export PDF
                    </button>

                </div>

            </div>

        </div>
    );
};

ChatHeader.propTypes = {
    onClear: PropTypes.func.isRequired,
    onDownload: PropTypes.func.isRequired,
};

export default ChatHeader;