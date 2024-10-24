import AsyncStorage from '@react-native-async-storage/async-storage';

// Hàm lưu trữ tin nhắn vào AsyncStorage
export const storeMessages = async (messages) => {
  try {
    const jsonMessages = JSON.stringify(messages); // Chuyển đổi thành chuỗi JSON
    await AsyncStorage.setItem('@chat_messages', jsonMessages);
  } catch (error) {
    console.error("Lỗi khi lưu trữ tin nhắn: ", error);
  }
};

// Hàm lấy tin nhắn từ AsyncStorage
export const getMessages = async () => {
  try {
    const jsonMessages = await AsyncStorage.getItem('@chat_messages');
    return jsonMessages != null ? JSON.parse(jsonMessages) : [];
  } catch (error) {
    console.error("Lỗi khi lấy tin nhắn: ", error);
    return [];
  }
};

// Ví dụ sử dụng
/*
    useEffect(() => {
    const fetchData = async () => {
        const storedMessages = await getMessages(); // Lấy tin nhắn từ bộ nhớ cục bộ
        console.log(storedMessages);
    };
    fetchData();
    }, []);
*/

export const getAllChats = () => {
    const chatList = [
      {
        $id: '1',
        latestMessage: 'Hey, are you free this weekend?',
        timestamp: '2024-10-17T10:45:00Z',
        chatName: "Test1",
        readed: false,
        isGroup: false,
        members: [ {
            avatar: 'https://i.pinimg.com/control/564x/e6/34/d3/e634d384fb0c31d7245d70d6f70f830d.jpg',
            email: 'charlie@example.com',
            username: 'hoang'
          }, {
            avatar: 'https://i.pinimg.com/564x/71/1a/bb/711abbf8f9bdea9e25e793fa67ddcc66.jpg',
            email: 'user1@gmail.com',
            username: 'quyen'
          }
        ]
      },
      {
        $id: '2',
        latestMessage: 'Just finished the project!chatMessagechatMessagechatMessagechatMessage',
        timestamp: '2023-10-17T10:30:00Z',
        chatName: "Test1",
        readed: true,
        isGroup: false,
        members: [ {
            avatar: 'https://i.pinimg.com/564x/37/e9/80/37e9800b6a5174043c18e4498d8b67a8.jpg',
            email: 'user1@gmail.com',
            username: 'quyen'
          }, {
            avatar: 'https://i.pinimg.com/564x/37/e9/80/37e9800b6a5174043c18e4498d8b67a8.jpg',
            email: 'charlie@example.com',
            username: 'hung'
          }
        ]
      },
      {
        $id: '3',
        latestMessage: 'Can we catch up tomorrow?',
        timestamp: '2024-06-17T09:50:00Z',
        chatName: "ChatGroup11111111111111111111111111111111",
        readed: false,
        isGroup: true,
        groupProfile: "https://i.pinimg.com/control/564x/e6/34/d3/e634d384fb0c31d7245d70d6f70f830d.jpg",
        members: [ {
            avatar: 'https://i.pinimg.com/564x/71/1a/bb/711abbf8f9bdea9e25e793fa67ddcc66.jpg',
            email: 'charlie@example.com',
            username: 'hung'
          }, {
            avatar: 'https://i.pinimg.com/564x/71/1a/bb/711abbf8f9bdea9e25e793fa67ddcc66.jpg',
            email: 'user1@gmail.com',
            username: 'quyen'
          }
        ]
      }
    ];
       
    return chatList;
}
const getAllMessage = async (chatId) => {
    const chatList = [
        {
          $id: '1',
          chatName: "Test1",
          readed: false,
          isGroup: false,
          members: [
            {
              avatar: 'https://i.pinimg.com/control/564x/e6/34/d3/e634d384fb0c31d7245d70d6f70f830d.jpg',
              email: 'charlie@example.com',
              username: 'hoang'
            },
            {
              avatar: 'https://i.pinimg.com/564x/71/1a/bb/711abbf8f9bdea9e25e793fa67ddcc66.jpg',
              email: 'user1@gmail.com',
              username: 'quyen'
            }
          ],
          messages: [
            {
              sender: 'charlie@example.com',  // linked by email
              timestamp: '2024-10-17T10:45:00Z',
              message: 'Hey, are you free this weekend?'
            },
            {
              sender: 'user1@gmail.com',  // linked by email
              timestamp: '2024-10-17T10:46:00Z',
              message: 'Yeah, I should be. What do you have in mind?'
            },
            {
              sender: 'charlie@example.com',  // linked by email
              timestamp: '2024-10-17T10:47:00Z',
              message: 'How about a hike?'
            }
          ]
        },
        {
          $id: '2',
          chatName: "Test1",
          readed: true,
          isGroup: false,
          members: [
            {
              avatar: 'https://i.pinimg.com/564x/37/e9/80/37e9800b6a5174043c18e4498d8b67a8.jpg',
              email: 'user1@gmail.com',
              username: 'quyen'
            },
            {
              avatar: 'https://i.pinimg.com/564x/71/1a/bb/711abbf8f9bdea9e25e793fa67ddcc66.jpg',
              email: 'charlie@example.com',
              username: 'hung'
            }
          ],
          messages: [
            {
              sender: 'user1@gmail.com',  // linked by email
              timestamp: '2023-10-17T10:30:00Z',
              message: 'Just finished the project!'
            },
            {
              sender: 'charlie@example.com',  // linked by email
              timestamp: '2023-10-17T10:35:00Z',
              message: 'Awesome work! Let’s review it tomorrow.'
            }
          ]
        },
        {
          $id: '3',
          chatName: "ChatGroup11111111111111111111111111111111",
          readed: false,
          isGroup: true,
          groupProfile: "https://i.pinimg.com/564x/71/1a/bb/711abbf8f9bdea9e25e793fa67ddcc66.jpg",
          members: [
            {
              avatar: 'https://i.pinimg.com/564x/71/1a/bb/711abbf8f9bdea9e25e793fa67ddcc66.jpg',
              email: 'charlie@example.com',
              username: 'hung'
            },
            {
              avatar: 'https://i.pinimg.com/564x/71/1a/bb/711abbf8f9bdea9e25e793fa67ddcc66.jpg',
              email: 'user1@gmail.com',
              username: 'quyen'
            }
          ],
          messages: [
            {
              sender: 'charlie@example.com',  // linked by email
              timestamp: '2024-06-17T09:50:00Z',
              message: 'Can we catch up tomorrow?'
            },
            {
              sender: 'user1@gmail.com',  // linked by email
              timestamp: '2024-06-17T09:55:00Z',
              message: 'Sure, what time works for you?'
            },
            {
              sender: 'charlie@example.com',  // linked by email
              timestamp: '2024-06-17T10:00:00Z',
              message: 'Let’s do 10 AM.'
            }
          ]
        }
      ];
    var messages = null;
    chatList.forEach(chat => {
        if(chat.$id == chatId)
            messages = chat;
    });
       
    return messages;
  }
// Usage
export const getChatMessages = async (chatId) => {
    const data = await getAllMessage(chatId); // Await the async function
    return(data);
};

export function getAvatarByEmail(chat, email) {
    const member = chat.members.find(member => member.email === email);
    return member ? member.avatar : null;
}
