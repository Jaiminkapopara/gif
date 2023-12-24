import { db } from "@/utils/firebase";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
  where,
  getDoc,
  collection,
  getDocs,
} from "firebase/firestore";

export const GET = async (request, { params }) => {
  const url = new URL(request.url);
  const gifId = url.searchParams.get("gifId");
  const userRef = doc(db, "users", ...params.favId);
  const usersRef = collection(db, "users");

  const querySnapshot = await getDocs(
    query(
      usersRef,
      where("favoriteGif", "array-contains", gifId),
      where("userId", "==", ...params.favId)
    )
  );

  if (!querySnapshot.empty) {
    await updateDoc(userRef, {
      favoriteGif: arrayRemove(gifId),
    });
  } else {
    await updateDoc(userRef, {
      favoriteGif: arrayUnion(gifId),
    });
  }

  const userFavoriteGif = await getDoc(userRef);

  return new Response(JSON.stringify(userFavoriteGif.data()?.favoriteGif), {
    status: 200,
  });
};
