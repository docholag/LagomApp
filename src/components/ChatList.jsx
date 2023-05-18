import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import ChatRow from "./ChatRow";

const ChatList = () => {
  const [matches, setMatches] = useState([]); //lưu danh sách trò chuyện
  const { user } = useAuth(); //lấy thông tin user qua useAuth

  useEffect(
    () =>
      onSnapshot(
        //lắng nghe thay đổi cớ sở dữ liệu
        query(
          collection(db, "matches"),
          where("usersMatched", "array-contains", user.uid) //user match phải chứa uid
        ),
        (
          snapshot //snapshot thay đổi
        ) =>
          setMatches(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
          )
      ),
    [user]
  );
  return matches.length > 0 ? ( //nếu có matches thì hiển thị danh sách trò chuyện
    <FlatList
      data={matches}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ChatRow matchDetails={item} />}
      className="h-full"
      alwaysBounceVertical={false}
    />
  ) : (
    <View className="p-5">
      <Text className="text-center text-lg">No matches at the moment😢</Text>
    </View>
  );
};

export default ChatList;
