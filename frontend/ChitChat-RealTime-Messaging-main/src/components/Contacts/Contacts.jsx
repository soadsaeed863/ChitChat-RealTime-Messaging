import { useChatContext } from "../../contexts/ChatContext";
import useGetChats from "../../hooks/useGetChats";
import styles from "./Contacts.module.css";

export const Contacts = ({
  onSelectContact,
  filterType,
  showUnread,

}) => {
  const { loading, chats } = useGetChats(filterType);
  const { selectedContact}= useChatContext();

  // const contacts = [
  //   {
  //     name: "name1",
  //     id: 1,
  //     profilepicture: "/avatar.png",
  //     type: "individual",
  //     unreadMessages: 3,
  //   },
  //   {
  //     name: "name2",
  //     id: 2,
  //     profilepicture: "/avatar.png",
  //     type: "group",
  //     unreadMessages: 0,
  //   },
  //   // { name: "name3", id: 3, profilepicture
  //   // : "/avatar.png", type: 'group', unreadMessages: 0 },
  //   //         // { name: "name4", id: 4, profilepicture
  //   // : "/avatar.png", type: 'group', unreadMessages: 0 },
  //   //         // { name: "name5", id: 5, profilepicture
  //   // : "/avatar.png", type: 'individual', unreadMessages: 10 },
  //   //         // { name: "name6", id: 6, profilepicture
  //   // : "/avatar.png", type: 'individual', unreadMessages: 0 },
  //   //         // { name: "name7", id: 7, profilepicture
  //   // : "/avatar.png", type: 'individual', unreadMessages: 0 },
  //   //         // { name: "name8", id: 8, profilepicture
  //   // : "/avatar.png", type: 'group', unreadMessages: 90 },
  //   //         // { name: "name9", id: 9, profilepicture
  //   // : "/avatar.png", type: 'individual', unreadMessages: 0 },
  //   //         // { name: "name10", id: 10, profilepicture
  //   // : "/avatar.png", type: 'group', unreadMessages: 1 },
  // ];

//   const filteredContacts = chats.filter((contact) => {
//     const typeMatch = filterType === "all" || contact.type === filterType;
//     const unreadMatch = !showUnread || contact.unreadMessages > 0;
//     return typeMatch && unreadMatch;
//   });

  const handleContactClick = (contact) => {
    if (selectedContact?._id === contact._id) {
      onSelectContact(null);
    } else {
      onSelectContact(contact);
    }
  };

  return (
    <div className={`list-group ${styles.con}`}>
      {chats.map((contact) => (
        <a
          href="#"
          key={contact._id}
          onClick={() => handleContactClick(contact)}
          className={`p-3 list-group-item list-group-item-action d-flex ${styles.contact} `}
        >
          <div className={styles.circularImage}>
            <img src={contact.profilePicture} alt={contact.userName} />
          </div>
          <div className="fs-5" style={{ color: "#9049BF" }}>
            {contact.userName}
          </div>
          {/* {contact.unreadMessages > 0 && (
            <span
              className="badge text-bg-danger rounded-pill d-flex"
              style={{
                position: "absolute",
                right: "10px",
                top: "10px",
              }}
            >
              {contact.unreadMessages}
            </span>
          )} */}
        </a>
      ))}
    </div>
  );
};

export default Contacts;