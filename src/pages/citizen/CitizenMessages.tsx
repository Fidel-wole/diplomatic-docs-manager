import { useState, useEffect } from "react";
import {
  FaPaperPlane,
  FaSearch,
  FaRegEnvelope,
  FaRegEnvelopeOpen,
  FaRegClock,
  FaArrowLeft,
  FaPaperclip
} from "react-icons/fa";

// Sample message data structure
interface Message {
  id: string;
  subject: string;
  body: string;
  timestamp: string;
  sender: string;
  isRead: boolean;
  category: string;
  attachments?: { name: string; url: string }[];
  replies?: {
    id: string;
    sender: string;
    body: string;
    timestamp: string;
  }[];
}

const CitizenMessages = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    // In a real application, this data would come from an API call
    const demoMessages: Message[] = [
      {
        id: "1",
        subject: "Passport Application Status Update",
        body: "Dear Applicant,\n\nYour passport application has been processed and is now ready for collection. Please visit the embassy during working hours (Monday-Friday, 9:00 AM - 3:00 PM) to collect your passport.\n\nPlease bring the following documents:\n- Original application receipt\n- Valid ID\n\nThank you for using our services.\n\nBest regards,\nPassport Department\nEmbassy CRM",
        timestamp: "2025-05-26T09:30:00Z",
        sender: "Passport Department",
        isRead: false,
        category: "passport",
        attachments: [{ name: "collection_instructions.pdf", url: "#" }],
        replies: [],
      },
      {
        id: "2",
        subject: "No Objection Letter Confirmation",
        body: "Dear Applicant,\n\nWe are pleased to inform you that your No Objection Letter (NOL) has been approved and issued.\n\nYou can download the digital copy attached to this message or collect the physical copy from the embassy.\n\nIf you have any questions, please don't hesitate to contact us.\n\nBest regards,\nConsular Services\nEmbassy CRM",
        timestamp: "2025-05-24T14:15:00Z",
        sender: "Consular Services",
        isRead: true,
        category: "nol",
        attachments: [{ name: "no_objection_letter.pdf", url: "#" }],
        replies: [
          {
            id: "reply1",
            sender: "You",
            body: "Thank you for the update. I will download the digital copy.",
            timestamp: "2025-05-24T15:20:00Z",
          },
          {
            id: "reply2",
            sender: "Consular Services",
            body: "You're welcome! Let us know if you need any other assistance.",
            timestamp: "2025-05-24T16:05:00Z",
          },
        ],
      },
      {
        id: "3",
        subject: "Document Attestation - Additional Information Required",
        body: "Dear Applicant,\n\nWe are processing your document attestation request, but we require some additional information to proceed.\n\nPlease provide the following:\n1. Original notarized copy of the document\n2. Translation (if the document is not in English or Arabic)\n\nKindly reply to this message with the requested information or visit the embassy in person.\n\nThank you for your cooperation.\n\nBest regards,\nAttestation Department\nEmbassy CRM",
        timestamp: "2025-05-22T11:45:00Z",
        sender: "Attestation Department",
        isRead: true,
        category: "attestation",
        attachments: [],
        replies: [],
      },
      {
        id: "4",
        subject: "Upcoming Embassy Closure Notice",
        body: "Dear Citizen,\n\nPlease be informed that the embassy will be closed on June 5, 2025, due to a national holiday.\n\nRegular services will resume on June 6, 2025.\n\nFor emergencies during this period, please contact our emergency hotline at +1-555-123-4567.\n\nThank you for your understanding.\n\nBest regards,\nAdministrative Office\nEmbassy CRM",
        timestamp: "2025-05-20T08:00:00Z",
        sender: "Administrative Office",
        isRead: true,
        category: "announcement",
        attachments: [],
        replies: [],
      },
      {
        id: "5",
        subject: "Emergency Travel Certificate - Approved",
        body: "Dear Applicant,\n\nYour application for an Emergency Travel Certificate has been approved and processed on an urgent basis.\n\nThe certificate is ready for collection. Due to the urgent nature of this document, you can collect it today until 6:00 PM from our emergency services counter.\n\nPlease bring your identification and application receipt.\n\nSafe travels,\nEmergency Services\nEmbassy CRM",
        timestamp: "2025-05-19T14:30:00Z",
        sender: "Emergency Services",
        isRead: false,
        category: "etc",
        attachments: [{ name: "etc_collection_note.pdf", url: "#" }],
        replies: [],
      },
    ];

    // Simulate loading delay
    setTimeout(() => {
      setMessages(demoMessages);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter messages based on search query and category
  const filteredMessages = messages.filter((message) => {
    const matchesSearch =
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.body.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.sender.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || message.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Message categories for filtering
  const categories = [
    { id: "all", name: "All Messages" },
    { id: "unread", name: "Unread" },
    { id: "passport", name: "Passport Services" },
    { id: "nol", name: "No Objection Letters" },
    { id: "attestation", name: "Attestation" },
    { id: "etc", name: "Emergency Travel" },
    { id: "announcement", name: "Announcements" },
  ];

  // Handler for message selection
  const handleSelectMessage = (message: Message) => {
    // Mark message as read
    if (!message.isRead) {
      const updatedMessages = messages.map((m) => {
        if (m.id === message.id) {
          return { ...m, isRead: true };
        }
        return m;
      });
      setMessages(updatedMessages);
    }

    setSelectedMessage(message);
  };

  // Handler for sending a reply
  const handleSendReply = () => {
    if (!replyText.trim() || !selectedMessage) return;

    // Create new reply
    const newReply = {
      id: `reply${Date.now()}`,
      sender: "You",
      body: replyText,
      timestamp: new Date().toISOString(),
    };

    // Add reply to the message
    const updatedMessages = messages.map((m) => {
      if (m.id === selectedMessage.id) {
        const replies = m.replies || [];
        return {
          ...m,
          replies: [...replies, newReply],
        };
      }
      return m;
    });

    // Update messages state
    setMessages(updatedMessages);

    // Update selected message
    const updatedMessage = updatedMessages.find(
      (m) => m.id === selectedMessage.id
    );
    if (updatedMessage) {
      setSelectedMessage(updatedMessage);
    }

    // Clear reply text
    setReplyText("");
  };

  // Handler for going back to message list
  const handleBackToList = () => {
    setSelectedMessage(null);
  };

  // Format timestamp to readable date/time
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    }).format(date);
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      {/* Main Container - Flex Layout */}
      <div className="flex flex-col md:flex-row min-h-[600px]">
        {/* Left Side - Message List */}
        {!selectedMessage ? (
          <div className="w-full md:w-1/3 border-r border-gray-200">
            {/* Search and Filters */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative mb-4">
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch className="absolute left-3 top-3 text-gray-400" />
              </div>

              <div className="flex overflow-x-auto space-x-2 pb-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 py-1 text-sm rounded-full whitespace-nowrap ${
                      selectedCategory === category.id
                        ? "bg-primary-100 text-primary-800 font-medium"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Message List */}
            <div
              className="overflow-y-auto"
              style={{ maxHeight: "calc(600px - 109px)" }}
            >
              {loading ? (
                <div className="p-6 text-center text-gray-500">
                  Loading messages...
                </div>
              ) : filteredMessages.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  No messages found.
                </div>
              ) : (
                filteredMessages.map((message) => (
                  <div
                    key={message.id}
                    onClick={() => handleSelectMessage(message)}
                    className={`p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
                      !message.isRead ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mt-1">
                        {message.isRead ? (
                          <FaRegEnvelopeOpen className="text-gray-400" />
                        ) : (
                          <FaRegEnvelope className="text-primary-600" />
                        )}
                      </div>
                      <div className="ml-3 flex-grow">
                        <div className="flex justify-between">
                          <h4
                            className={`text-sm font-medium ${
                              !message.isRead
                                ? "text-gray-900"
                                : "text-gray-700"
                            }`}
                          >
                            {message.sender}
                          </h4>
                          <span className="text-xs text-gray-500">
                            {new Date(message.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <p
                          className={`text-sm ${
                            !message.isRead
                              ? "font-semibold text-gray-900"
                              : "text-gray-600"
                          }`}
                        >
                          {message.subject}
                        </p>
                        <p className="text-xs text-gray-500 truncate mt-1">
                          {message.body.substring(0, 80)}...
                        </p>
                        {message.attachments &&
                          message.attachments.length > 0 && (
                            <div className="mt-1 text-xs text-primary-600 flex items-center">
                              <FaPaperclip className="mr-1" />
                              <span>
                                {message.attachments.length} attachment
                                {message.attachments.length > 1 ? "s" : ""}
                              </span>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ) : (
          // Mobile view - Back button for selected message
          <div className="md:hidden p-4 border-b border-gray-200">
            <button
              onClick={handleBackToList}
              className="flex items-center text-primary-600"
            >
              <FaArrowLeft className="mr-2" /> Back to messages
            </button>
          </div>
        )}

        {/* Right Side - Message Detail or Empty State */}
        <div
          className={`flex-grow bg-gray-50 ${selectedMessage && "md:block"}`}
        >
          {selectedMessage ? (
            <div className="h-full flex flex-col">
              {/* Message Header */}
              <div className="p-4 bg-white border-b border-gray-200">
                <div className="hidden md:block mb-2">
                  <button
                    onClick={handleBackToList}
                    className="flex items-center text-primary-600 text-sm"
                  >
                    <FaArrowLeft className="mr-1" /> Back to messages
                  </button>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {selectedMessage.subject}
                </h2>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-600">
                    From:{" "}
                    <span className="font-semibold">
                      {selectedMessage.sender}
                    </span>
                  </span>
                  <span className="text-sm text-gray-500 flex items-center">
                    <FaRegClock className="mr-1" />{" "}
                    {formatTimestamp(selectedMessage.timestamp)}
                  </span>
                </div>
              </div>

              {/* Message Body */}
              <div className="p-6 flex-grow overflow-y-auto">
                <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
                  <pre className="whitespace-pre-wrap text-gray-800 font-sans">
                    {selectedMessage.body}
                  </pre>

                  {selectedMessage.attachments &&
                    selectedMessage.attachments.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-gray-200">
                        <h5 className="text-sm font-medium text-gray-700 mb-2">
                          Attachments
                        </h5>
                        <div className="space-y-2">
                          {selectedMessage.attachments.map(
                            (attachment, index) => (
                              <div key={index} className="flex items-center">
                                <FaPaperclip className="text-gray-400 mr-2" />
                                <a
                                  href={attachment.url}
                                  className="text-sm text-primary-600 hover:text-primary-800"
                                >
                                  {attachment.name}
                                </a>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                </div>

                {/* Conversation History */}
                {selectedMessage.replies &&
                  selectedMessage.replies.length > 0 && (
                    <div className="mb-4">
                      <h5 className="text-sm font-medium text-gray-700 mb-3">
                        Previous Replies
                      </h5>
                      {selectedMessage.replies.map((reply) => (
                        <div
                          key={reply.id}
                          className={`mb-3 flex ${
                            reply.sender === "You"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`rounded-lg p-3 max-w-[80%] ${
                              reply.sender === "You"
                                ? "bg-primary-100 text-primary-900"
                                : "bg-white text-gray-800 shadow-sm"
                            }`}
                          >
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-medium">
                                {reply.sender}
                              </span>
                              <span className="text-xs text-gray-500">
                                {formatTimestamp(reply.timestamp)}
                              </span>
                            </div>
                            <p className="text-sm">{reply.body}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
              </div>

              {/* Reply Area */}
              <div className="p-4 bg-white border-t border-gray-200">
                <div className="flex">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type your reply here..."
                    className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                    rows={2}
                  ></textarea>
                  <button
                    onClick={handleSendReply}
                    disabled={!replyText.trim()}
                    className="px-4 bg-primary-600 text-white rounded-r-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-gray-400"
                  >
                    <FaPaperPlane />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center flex-col p-6 text-center text-gray-500 hidden md:flex">
              <FaRegEnvelope className="text-gray-300 text-5xl mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">
                No Message Selected
              </h3>
              <p className="text-gray-500 max-w-xs">
                Select a message from the list to view its contents.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CitizenMessages;
