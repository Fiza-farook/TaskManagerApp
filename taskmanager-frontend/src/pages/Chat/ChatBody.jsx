import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

import ChatBubble from "./ChatBubble";
import EmptyChat from "./EmptyChat";

const ChatBody = ({
    messages,
    loading,
    sending,
}) => {
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, sending]);

    if (loading) {
        return (
            <div className="card border-0 shadow-sm chat-body">

                <div className="d-flex justify-content-center align-items-center h-100">

                    <div
                        className="spinner-border text-primary"
                        role="status"
                    >
                        <span className="visually-hidden">
                            Loading...
                        </span>
                    </div>

                </div>

            </div>
        );
    }

    return (
        <div className="card border-0 shadow-sm chat-body">

            <div className="card-body overflow-auto">

                {messages.length === 0 ? (

                    <EmptyChat />

                ) : (

                    <>
                        {messages.map((message) => (
                            <ChatBubble
                                key={message.id}
                                message={message}
                            />
                        ))}

                        {sending && (

                            <div className="d-flex mb-3">

                                <div className="chat-bubble bot">

                                    <div className="spinner-grow spinner-grow-sm me-2"></div>

                                    AI is typing...

                                </div>

                            </div>

                        )}

                        <div ref={bottomRef}></div>
                    </>

                )}

            </div>

        </div>
    );
};

ChatBody.propTypes = {
    messages: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    sending: PropTypes.bool.isRequired,
};

export default ChatBody;