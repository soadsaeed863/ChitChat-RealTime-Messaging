import { useState } from "react";
import Contacts from "../../components/Contacts/Contacts";
import Navbar from "../../components/Nav/Nav";
import Topbar from "../../components/TopBar/TopBar";
import Chat from "../../components/Chat/Chat";
import NameBar from "../../components/NameBar/NameBar";
import SearchBar from "../SearchBar/SearchBar";
import logo from "/info.png";
import { useChatContext } from "../../contexts/ChatContext";

export const MainLayout = () => {
  const { messages, setMessages, selectedContact, setSelectedContact } =
    useChatContext();
  const [isSliding, setIsSliding] = useState(false);
  const [filterType, setFilterType] = useState("all");
  const [showUnread, setShowUnread] = useState(false);

  // Mock-up messages for contacts (by IDs)
  const contactMessages = {
    1: [
      { text: "Hi!", isUser: true },
      { text: "How are you?", isUser: false },
    ],
    2: [
      { text: "Hello!", isUser: false },
      { text: "Can we meet tomorrow?", isUser: true },
    ],
    3: [
      { text: "What's up?", isUser: true },
      { text: "Good to see you!", isUser: false },
    ],
    4: [
      { text: "Hey!", isUser: false },
      { text: "Where are you now?", isUser: true },
    ],
    5: [
      { text: "Yo!", isUser: true },
      { text: "Ready for the project?", isUser: false },
    ],
  };

  const handleSelectContact = (contact) => {
    setIsSliding(true);

    setTimeout(() => {
      setSelectedContact(contact);
      setMessages(contactMessages[contact.id] || []);
      setIsSliding(false);
    }, 200);
  };

  const handleBack = () => {
    setIsSliding(true);

    setTimeout(() => {
      setSelectedContact(null);
      setIsSliding(false);
    }, 200);
  };

  return (
    <div
      className="container-fluid"
      style={{ background: "linear-gradient(#88B6F2, #9049BF)" }}
    >
      <div className="row">
        <div className="col-md-5 col-lg-4 p-0 d-none d-md-block">
          <Topbar />
          <div className="d-flex flex-fill">
            <Navbar />
            <div className="d-flex flex-column flex-grow-1">
              <SearchBar
                setFilterType={setFilterType}
                setShowUnread={setShowUnread}
                showUnread={showUnread}
              />
              <Contacts
                onSelectContact={handleSelectContact}
                filterType={filterType}
                showUnread={showUnread}
              />
            </div>
          </div>
        </div>

        <div
          className={`col-md-7 col-lg-8 col-12 p-0 ${
            selectedContact ? "sliding" : ""
          }`}
          style={{
            position: "relative",
            overflow: "hidden",
            background: "linear-gradient(#88B6F2, #9049BF)",
            height: "100vh",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: isSliding ? "-100%" : "0",
              width: "100%",
              height: "100%",
              transition: "left 0.2s ease-in-out",
            }}
          >
            {selectedContact ? (
              <>
                <NameBar
                  selectedContact={selectedContact}
                  setSelectedContact={handleBack}
                />
                <Chat
                />
              </>
            ) : (
              <>
                <div
                  className="d-flex justify-content-center align-items-center flex-column d-none d-md-flex"
                  style={{
                    background: "linear-gradient(#88B6F2, #9049BF)",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <img src={logo} alt="Logo" />
                </div>

                <div
                  className="d-flex justify-content-center flex-column d-md-none flex-fill"
                  style={{ backgroundColor: "#9049BF", height: "100%" }}
                >
                  <div className="">
                    <Topbar />
                    <div className="d-flex flex-fill">
                      <Navbar />
                      <div className="d-flex flex-column flex-grow-1">
                        <SearchBar
                          setFilterType={setFilterType}
                          setShowUnread={setShowUnread}
                          showUnread={showUnread}
                        />
                        <Contacts
                          onSelectContact={handleSelectContact}
                          filterType={filterType}
                          showUnread={showUnread}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <style >{`
        .sliding {
          animation: slide 0.3s forwards ease-in-out;
        }
        @keyframes slide {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
};

export default MainLayout;