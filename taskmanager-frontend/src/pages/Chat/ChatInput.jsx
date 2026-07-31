import { useState } from "react";
import PropTypes from "prop-types";

const ChatInput = ({
    onSend,
    sending,
}) => {
    const [message, setMessage] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const trimmedMessage = message.trim();

        if (!trimmedMessage || sending) {
            return;
        }

        onSend(trimmedMessage);

        setMessage("");
    };

    const handleKeyDown = (e) => {
        if (
            e.key === "Enter" &&
            !e.shiftKey
        ) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="card border-0 shadow-sm mt-3">

            <div className="card-body">

                <form onSubmit={handleSubmit}>

                    <div className="input-group">

                        <textarea
                            className="form-control"
                            rows="2"
                            placeholder="Ask me anything..."
                            value={message}
                            disabled={sending}
                            onChange={(e) =>
                                setMessage(e.target.value)
                            }
                            onKeyDown={handleKeyDown}
                        />

                        <button
                            type="submit"
                            className="btn btn-primary px-4"
                            disabled={
                                sending ||
                                message.trim() === ""
                            }
                        >
                            {sending ? (
                                <>
                                    <span
                                        className="spinner-border spinner-border-sm me-2"
                                        role="status"
                                    ></span>

                                    Sending...
                                </>
                            ) : (
                                <>
                                    <i className="bi bi-send-fill me-2"></i>
                                    Send
                                </>
                            )}
                        </button>

                    </div>

                    <small className="text-muted mt-2 d-block">
                        Press <strong>Enter</strong> to send • <strong>Shift + Enter</strong> for a new line
                    </small>

                </form>

            </div>

        </div>
    );
};

ChatInput.propTypes = {
    onSend: PropTypes.func.isRequired,
    sending: PropTypes.bool.isRequired,
};

export default ChatInput;