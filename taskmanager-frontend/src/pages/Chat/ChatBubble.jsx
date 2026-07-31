import PropTypes from "prop-types";

const ChatBubble = ({ message }) => {

    const formatTime = (dateTime) => {
        return new Date(dateTime).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="mb-4">

            {/* User Message */}

            <div className="d-flex justify-content-end mb-2">

                <div className="chat-bubble user">

                    <div className="chat-header">
                        <i className="bi bi-person-circle me-2"></i>

                        <strong>You</strong>
                    </div>

                    <div className="mt-2">
                        {message.question}
                    </div>

                </div>

            </div>

            {/* AI Response */}

            <div className="d-flex justify-content-start">

                <div className="chat-bubble bot">

                    <div className="chat-header">

                        <i className="bi bi-robot me-2 text-primary"></i>

                        <strong>AI Assistant</strong>

                    </div>

                    <div className="mt-2">

                        {message.response}

                    </div>

                    <div className="chat-time">

                        {formatTime(message.created_at)}

                    </div>

                </div>

            </div>

        </div>
    );
};

ChatBubble.propTypes = {
    message: PropTypes.shape({
        id: PropTypes.number.isRequired,
        question: PropTypes.string.isRequired,
        response: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
    }).isRequired,
};

export default ChatBubble;